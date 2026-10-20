import prisma from "@/app/_lib/prisma";
import { Prisma, ReminderDeliveryStatus } from "@/app/generated/prisma/client";
import webPush from "web-push";

const MAX_DELIVERY_ATTEMPTS = 5;
const DELIVERY_LEASE_MS = 5 * 60_000;

interface LocalSchedule {
  date: string;
  weekday: number;
  minutes: number;
}

const getLocalSchedule = (date: Date, timezone: string): LocalSchedule => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  const weekdays: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const weekday = weekdays[values.weekday];
  if (
    !values.year ||
    !values.month ||
    !values.day ||
    weekday === undefined ||
    !values.hour ||
    !values.minute
  ) {
    throw new Error("Não foi possível calcular o horário local do lembrete.");
  }

  return {
    date: `${values.year}-${values.month}-${values.day}`,
    weekday,
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
};

const getErrorStatusCode = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  ) {
    return error.statusCode;
  }
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const createPendingDelivery = async (userId: string, localDate: string) => {
  try {
    await prisma.reminderDelivery.create({
      data: { userId, localDate },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return;
    }

    throw error;
  }
};

export const dispatchDueReminders = async () => {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;

  if (!publicKey || !privateKey || !subject) {
    throw new Error(
      "As chaves VAPID para notificações não estão configuradas.",
    );
  }

  webPush.setVapidDetails(subject, publicKey, privateKey);

  const now = new Date();
  const users = await prisma.user.findMany({
    where: {
      pushNotificationsEnabled: true,
      reminderTime: { not: null },
      reminderTimezone: { not: null },
      reminderWeekdays: { isEmpty: false },
      pushSubscriptions: { some: {} },
    },
    select: {
      id: true,
      reminderWeekdays: true,
      reminderTime: true,
      reminderTimezone: true,
    },
  });

  for (const user of users) {
    if (!user.reminderTime || !user.reminderTimezone) continue;

    const local = getLocalSchedule(now, user.reminderTimezone);
    const [scheduledHour, scheduledMinute] = user.reminderTime
      .split(":")
      .map(Number);
    const scheduledMinutes = scheduledHour * 60 + scheduledMinute;
    const minutesAfterSchedule = local.minutes - scheduledMinutes;

    if (
      user.reminderWeekdays.includes(local.weekday) &&
      minutesAfterSchedule >= 0 &&
      minutesAfterSchedule <= 2
    ) {
      await createPendingDelivery(user.id, local.date);
    }
  }

  const deliveries = await prisma.reminderDelivery.findMany({
    where: {
      OR: [
        {
          status: ReminderDeliveryStatus.PENDING,
          nextAttemptAt: { lte: now },
        },
        {
          status: ReminderDeliveryStatus.SENDING,
          nextAttemptAt: { lte: now },
        },
      ],
      user: {
        is: {
          pushNotificationsEnabled: true,
          pushSubscriptions: { some: {} },
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          weeklyTestGoal: true,
          pushSubscriptions: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
    take: 100,
  });

  let sent = 0;
  let failed = 0;

  for (const delivery of deliveries) {
    const attempts = delivery.attempts + 1;
    const claim = await prisma.reminderDelivery.updateMany({
      where: {
        id: delivery.id,
        status: delivery.status,
        nextAttemptAt: { lte: now },
      },
      data: {
        status: ReminderDeliveryStatus.SENDING,
        attempts,
        nextAttemptAt: new Date(now.getTime() + DELIVERY_LEASE_MS),
      },
    });
    if (claim.count === 0) continue;

    const failures: string[] = [];
    let delivered = false;

    for (const subscription of delivery.user.pushSubscriptions) {
      try {
        await webPush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          JSON.stringify({
            title: "Está na hora de praticar",
            body: `Continue a preparar-se para o exame. O seu objetivo é fazer ${delivery.user.weeklyTestGoal ?? 3} testes esta semana.`,
            url: "/panel",
          }),
        );
        delivered = true;
      } catch (error) {
        const statusCode = getErrorStatusCode(error);

        if (statusCode === 404 || statusCode === 410) {
          await prisma.pushSubscription.delete({
            where: { id: subscription.id },
          });
          continue;
        }

        failures.push(getErrorMessage(error));
      }
    }

    if (delivered) {
      await prisma.reminderDelivery.update({
        where: { id: delivery.id },
        data: {
          status: ReminderDeliveryStatus.SENT,
          sentAt: new Date(),
          lastError: null,
        },
      });
      sent += 1;
      continue;
    }

    const remainingSubscriptions = await prisma.pushSubscription.count({
      where: { userId: delivery.userId },
    });
    if (remainingSubscriptions === 0) {
      await prisma.user.update({
        where: { id: delivery.userId },
        data: { pushNotificationsEnabled: false },
      });
    }

    const terminalFailure = attempts >= MAX_DELIVERY_ATTEMPTS;
    await prisma.reminderDelivery.update({
      where: { id: delivery.id },
      data: {
        status: terminalFailure
          ? ReminderDeliveryStatus.FAILED
          : ReminderDeliveryStatus.PENDING,
        nextAttemptAt: new Date(
          now.getTime() + Math.min(2 ** attempts * 60_000, 60 * 60_000),
        ),
        lastError:
          failures.join("; ").slice(0, 1000) ||
          "Não existe uma subscrição push ativa.",
      },
    });
    failed += 1;
  }

  return { sent, failed };
};

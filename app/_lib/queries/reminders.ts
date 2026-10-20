"use server";

import prisma from "@/app/_lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export const fetchReminderPreferencesQuery = async (userId: string) =>
  prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
      examDate: true,
      weeklyTestGoal: true,
      reminderWeekdays: true,
      reminderTime: true,
      reminderTimezone: true,
      pushNotificationsEnabled: true,
    },
  });

export const updateReminderPreferencesQuery = async (
  userId: string,
  data: Prisma.UserUpdateInput,
) =>
  prisma.$transaction(async (transaction) => {
    const user = await transaction.user.update({
      where: { id: userId },
      data,
    });
    await transaction.reminderDelivery.deleteMany({
      where: { userId, status: { in: ["PENDING", "SENDING"] } },
    });
    return user;
  });

export const upsertPushSubscriptionQuery = async (
  userId: string,
  endpoint: string,
  p256dh: string,
  auth: string,
) =>
  prisma.pushSubscription.upsert({
    where: { endpoint },
    create: {
      endpoint,
      p256dh,
      auth,
      userId,
    },
    update: {
      p256dh,
      auth,
      userId,
    },
  });

export const disablePushSubscriptionsQuery = async (userId: string) =>
  prisma.$transaction([
    prisma.pushSubscription.deleteMany({ where: { userId } }),
    prisma.reminderDelivery.deleteMany({
      where: { userId, status: { in: ["PENDING", "SENDING"] } },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { pushNotificationsEnabled: false },
    }),
  ]);

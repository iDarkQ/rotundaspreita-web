"use server";

import {
  disablePushSubscriptionsQuery,
  fetchReminderPreferencesQuery,
  updateReminderPreferencesQuery,
  upsertPushSubscriptionQuery,
} from "@/app/_lib/queries/reminders";
import { verifySession } from "@/app/_services/user-service";

export interface ReminderPreferencesInput {
  examDate: string | null;
  weeklyTestGoal: number;
  reminderWeekdays: number[];
  reminderTime: string;
  reminderTimezone: string;
}

export interface PushSubscriptionInput {
  endpoint: string;
  keys?: {
    p256dh: string;
    auth: string;
  };
}

export const fetchReminderPreferences = async () => {
  const user = await verifySession();
  const preferences = await fetchReminderPreferencesQuery(user.id);

  if (!preferences) {
    throw new Error("Não foi possível carregar as preferências de lembretes.");
  }

  return {
    ...preferences,
    examDate: preferences.examDate?.toISOString().slice(0, 10) ?? null,
  };
};

const validatePreferences = (input: ReminderPreferencesInput) => {
  if (
    !Number.isInteger(input.weeklyTestGoal) ||
    input.weeklyTestGoal < 1 ||
    input.weeklyTestGoal > 100
  ) {
    throw new Error("O objetivo semanal deve estar entre 1 e 100 testes.");
  }

  if (
    !input.reminderWeekdays.length ||
    input.reminderWeekdays.some(
      (day) => !Number.isInteger(day) || day < 0 || day > 6,
    ) ||
    new Set(input.reminderWeekdays).size !== input.reminderWeekdays.length
  ) {
    throw new Error("Selecione pelo menos um dia válido para os lembretes.");
  }

  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(input.reminderTime)) {
    throw new Error("Selecione uma hora válida para os lembretes.");
  }

  if (!input.reminderTimezone || input.reminderTimezone.length > 64) {
    throw new Error("Não foi possível identificar o fuso horário.");
  }

  try {
    new Intl.DateTimeFormat("pt-PT", { timeZone: input.reminderTimezone });
  } catch {
    throw new Error("O fuso horário selecionado não é válido.");
  }

  if (input.examDate !== null) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.examDate)) {
      throw new Error("A data do exame não é válida.");
    }

    const parsedDate = new Date(`${input.examDate}T12:00:00.000Z`);
    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== input.examDate
    ) {
      throw new Error("A data do exame não é válida.");
    }
  }
};

export const saveReminderPreferences = async (
  input: ReminderPreferencesInput,
) => {
  validatePreferences(input);
  const user = await verifySession();

  await updateReminderPreferencesQuery(user.id, {
    examDate: input.examDate
      ? new Date(`${input.examDate}T12:00:00.000Z`)
      : null,
    weeklyTestGoal: input.weeklyTestGoal,
    reminderWeekdays: input.reminderWeekdays,
    reminderTime: input.reminderTime,
    reminderTimezone: input.reminderTimezone,
    onboardingCompleted: true,
  });
};

export const deferOnboarding = async () => {
  const user = await verifySession();
  await updateReminderPreferencesQuery(user.id, {
    onboardingDeferredAt: new Date(),
  });
};

const validateSubscription = (subscription: PushSubscriptionInput) => {
  if (
    typeof subscription.endpoint !== "string" ||
    subscription.endpoint.length > 2048
  ) {
    throw new Error("A subscrição de notificações não é válida.");
  }

  let endpoint: URL;
  try {
    endpoint = new URL(subscription.endpoint);
  } catch {
    throw new Error("A subscrição de notificações não é válida.");
  }

  const allowedHostSuffixes = [
    "fcm.googleapis.com",
    "push.services.mozilla.com",
    "web.push.apple.com",
  ];
  const supportedHost = allowedHostSuffixes.some(
    (suffix) =>
      endpoint.hostname === suffix || endpoint.hostname.endsWith(`.${suffix}`),
  );

  if (
    endpoint.protocol !== "https:" ||
    !supportedHost ||
    endpoint.username ||
    endpoint.password ||
    (endpoint.port && endpoint.port !== "443")
  ) {
    throw new Error("O fornecedor de notificações não é suportado.");
  }

  if (
    !subscription.keys ||
    typeof subscription.keys.p256dh !== "string" ||
    typeof subscription.keys.auth !== "string" ||
    subscription.keys.p256dh.length > 256 ||
    subscription.keys.auth.length > 256
  ) {
    throw new Error("As chaves da subscrição de notificações não são válidas.");
  }

  return {
    endpoint: endpoint.toString(),
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
  };
};

export const enablePushNotifications = async (
  subscription: PushSubscriptionInput,
) => {
  const keys = validateSubscription(subscription);
  const user = await verifySession();
  await upsertPushSubscriptionQuery(
    user.id,
    keys.endpoint,
    keys.p256dh,
    keys.auth,
  );

  await updateReminderPreferencesQuery(user.id, {
    pushNotificationsEnabled: true,
  });
};

export const disablePushNotifications = async () => {
  const user = await verifySession();
  await disablePushSubscriptionsQuery(user.id);
};

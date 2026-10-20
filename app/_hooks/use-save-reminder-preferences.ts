"use client";

import {
  disablePushNotifications,
  enablePushNotifications,
  ReminderPreferencesInput,
  saveReminderPreferences,
} from "@/app/_services/reminder-service";
import {
  createBrowserPushSubscription,
  removeBrowserPushSubscription,
} from "@/app/_utils/browser-push";
import { useState } from "react";

export interface SaveReminderPreferencesResult {
  saved: boolean;
  error: string | null;
  pushError: string | null;
}

const errorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "Não foi possível guardar as preferências.";

export const useSaveReminderPreferences = (pushAlreadyEnabled: boolean) => {
  const [loading, setLoading] = useState(false);

  const save = async (
    preferences: ReminderPreferencesInput,
    pushEnabled: boolean,
  ): Promise<SaveReminderPreferencesResult> => {
    setLoading(true);

    const needsSubscription = pushEnabled && !pushAlreadyEnabled;
    let subscription: Awaited<
      ReturnType<typeof createBrowserPushSubscription>
    > | null = null;
    let pushError: string | null = null;

    try {
      // Requested first so the permission prompt stays tied to the user's click.
      if (needsSubscription) {
        try {
          subscription = await createBrowserPushSubscription();
        } catch (subscriptionError) {
          pushError = errorMessage(subscriptionError);
        }
      }

      await saveReminderPreferences(preferences);

      if (pushEnabled && subscription) {
        await enablePushNotifications(subscription);
      } else if (needsSubscription) {
        await disablePushNotifications();
      } else if (!pushEnabled) {
        await disablePushNotifications();
        try {
          await removeBrowserPushSubscription();
        } catch (unsubscribeError) {
          pushError = errorMessage(unsubscribeError);
        }
      }

      return { saved: true, error: null, pushError };
    } catch (saveError) {
      return { saved: false, error: errorMessage(saveError), pushError: null };
    } finally {
      setLoading(false);
    }
  };

  return { save, loading };
};

import { PushSubscriptionInput } from "@/app/_services/reminder-service";
import {
  isSupportedPushHost,
  unsupportedPushServiceMessage,
} from "@/app/_utils/push-endpoint";

const decodeApplicationServerKey = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const raw = window.atob(padded);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
};

export const createBrowserPushSubscription =
  async (): Promise<PushSubscriptionInput> => {
    if (
      !("Notification" in window) ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window)
    ) {
      throw new Error("Este navegador não suporta notificações push.");
    }

    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) {
      throw new Error("As notificações push ainda não estão configuradas.");
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error(
        permission === "denied"
          ? "As notificações foram bloqueadas nas definições do navegador."
          : "Não foi concedida autorização para enviar notificações.",
      );
    }

    const registration = await navigator.serviceWorker.register("/sw.js");
    const existingSubscription =
      await registration.pushManager.getSubscription();
    const subscription =
      existingSubscription ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeApplicationServerKey(publicKey),
      }));
    const { hostname } = new URL(subscription.endpoint);
    if (!isSupportedPushHost(hostname)) {
      throw new Error(unsupportedPushServiceMessage(hostname));
    }

    const keys = subscription.toJSON().keys;

    if (!keys?.p256dh || !keys.auth) {
      throw new Error("Não foi possível obter as chaves das notificações.");
    }

    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    };
  };

export const removeBrowserPushSubscription = async () => {
  if (!("serviceWorker" in navigator)) return;

  const registration = await navigator.serviceWorker.getRegistration("/");
  const subscription = await registration?.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
  }
};

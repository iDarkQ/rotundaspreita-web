const SUPPORTED_PUSH_HOST_SUFFIXES = [
  "fcm.googleapis.com",
  "push.services.mozilla.com",
  "web.push.apple.com",
  "notify.windows.com",
];

export const isSupportedPushHost = (hostname: string) =>
  SUPPORTED_PUSH_HOST_SUFFIXES.some(
    (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`),
  );

export const unsupportedPushServiceMessage = (hostname: string) =>
  `O serviço de notificações deste navegador (${hostname}) não é suportado. Use o Google Chrome, o Microsoft Edge, o Firefox ou o Safari.`;

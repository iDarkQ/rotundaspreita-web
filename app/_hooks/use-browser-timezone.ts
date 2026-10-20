"use client";

import { useSyncExternalStore } from "react";

const FALLBACK_TIMEZONE = "Europe/Lisbon";
const subscribe = () => () => {};

export const useBrowserTimezone = (savedTimezone: string | null) =>
  useSyncExternalStore(
    subscribe,
    () =>
      savedTimezone ??
      (Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK_TIMEZONE),
    () => savedTimezone ?? FALLBACK_TIMEZONE,
  );

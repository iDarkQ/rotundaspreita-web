"use client";

import { posthogClient } from "@/app/_lib/instrumentation-client";
import { Properties } from "posthog-js";
import { useEffect } from "react";

interface Props {
  eventName: string;
  eventParams?: Properties | null;
}

export const LogAnalytics = ({ eventName, eventParams }: Props) => {
  useEffect(() => {
    if (posthogClient) {
      posthogClient.capture(eventName, eventParams);
    }
  }, [eventName, eventParams]);

  return null;
};

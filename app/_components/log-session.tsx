"use client";

import { posthogClient } from "@/app/_lib/instrumentation-client";
import { useEffect } from "react";

export const LogSession = () => {
  useEffect(() => {
    if (posthogClient) {
      posthogClient.reset();
    }
  }, []);

  return null;
};

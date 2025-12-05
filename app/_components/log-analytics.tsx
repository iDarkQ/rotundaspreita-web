"use client";

import { useEffect } from "react";
import { EventParams, logEvent } from "firebase/analytics";
import { analytics, CustomEventName } from "@/app/_lib/firebase";

interface Props {
  eventName: CustomEventName;
  eventParams?: {
    coupon?: EventParams["coupon"];
    currency?: EventParams["currency"];
    items?: EventParams["items"];
    payment_type?: EventParams["payment_type"];
    value?: EventParams["value"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export const LogAnalytics = ({ eventName, eventParams }: Props) => {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  }, [eventName, eventParams]);

  return null;
};

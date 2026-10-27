"use client";

import { useEffect, useRef, useState } from "react";
import { Text } from "@/app/_components/text";
import { useTestManager } from "@/app/test/providers/test-manager";

const TEST_DURATION_SECONDS = 60 * 30;

export const TestDetailsCountdown = () => {
  const { finished, finishTest } = useTestManager();

  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
  const endTime = useRef<number | null>(null);
  const timeUpHandled = useRef(false);
  // finishTest changes on every provider render; the ref keeps the interval
  // stable so answering questions never restarts the clock.
  const latestFinishTest = useRef(finishTest);

  useEffect(() => {
    latestFinishTest.current = finishTest;
  });

  useEffect(() => {
    if (finished) return;

    endTime.current ??= Date.now() + TEST_DURATION_SECONDS * 1000;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil(((endTime.current ?? 0) - Date.now()) / 1000),
      );
      setTimeLeft(remaining);

      if (remaining === 0 && !timeUpHandled.current) {
        timeUpHandled.current = true;
        latestFinishTest.current();
      }
    };

    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [finished]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Text as="p" className="text-primary">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </Text>
  );
};

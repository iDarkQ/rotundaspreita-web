"use client";

import { useEffect, useState } from "react";
import { Text } from "@/app/_components/text";
import { useTestManager } from "@/app/test/providers/test-manager";

export const TestDetailsCountdown = () => {
  const { finished, finishTest } = useTestManager();

  const [timeLeft, setTimeLeft] = useState(60 * 30);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, finishTest, finished]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Text as="p" className="text-primary">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </Text>
  );
};

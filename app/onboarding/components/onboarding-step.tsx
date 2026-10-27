"use client";

import { Text } from "@/app/_components/text";
import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  title: string;
  description?: string;
  direction: "forward" | "backward";
  children?: ReactNode;
}

export const OnboardingStep = ({
  title,
  description,
  direction,
  children,
}: Props) => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-8 motion-reduce:animate-none",
        direction === "forward"
          ? "animate-step-forward"
          : "animate-step-backward",
      )}
    >
      <div
        ref={headingRef}
        tabIndex={-1}
        className="flex flex-col gap-3 outline-none"
      >
        <Text as="h1" className="text-4xl! max-sm:text-3xl!">
          {title}
        </Text>
        {description && <Text className="opacity-80">{description}</Text>}
      </div>
      {children}
    </div>
  );
};

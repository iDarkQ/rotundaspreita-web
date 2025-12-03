"use client";

import { useRipple } from "@/app/_hooks/use-ripple";
import clsx from "clsx";
import { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  variant?: "contained" | "outlined";
  onClick?: () => void;
  clickable?: boolean;
}

export const Chip = ({
  children,
  onClick,
  clickable,
  variant = "contained",
}: Props) => {
  const { ref } = useRipple(true, !onClick && !clickable);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      onClick={onClick}
      className={clsx(
        "relative flex h-(--chip-height) items-center justify-center gap-1 overflow-hidden rounded-xl px-3 transition-colors",
        variant === "contained" && "bg-primary",
        variant === "outlined" && "c-border",
        (onClick || clickable) && "cursor-pointer select-none",
      )}
    >
      {children}
    </div>
  );
};

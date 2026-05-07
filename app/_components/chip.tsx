"use client";

import { useRipple } from "@/app/_hooks/use-ripple";
import clsx from "clsx";
import { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  variant?: "contained" | "outlined";
  color?: "primary" | "success" | "error" | "neutral";
  onClick?: () => void;
  clickable?: boolean;
  className?: string;
  square?: boolean;
}

export const Chip = ({
  children,
  onClick,
  clickable,
  variant = "contained",
  color = "primary",
  className,
  square,
}: Props) => {
  const { ref } = useRipple(true, !onClick && !clickable);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      onClick={onClick}
      className={clsx(
        "relative flex items-center justify-center gap-1 overflow-hidden transition-colors",
        variant === "contained" && "bg-primary",
        variant === "outlined" && "c-border",
        color === "error" && "bg-error-bg!",
        color === "success" && "bg-success-bg!",
        color === "neutral" && "bg-border!",
        square
          ? "aspect-square h-(--chip-height) w-auto rounded-sm p-5"
          : "h-(--chip-height) rounded-xl px-3",
        (onClick || clickable) && "cursor-pointer select-none",
        className && className,
      )}
    >
      {children}
    </div>
  );
};

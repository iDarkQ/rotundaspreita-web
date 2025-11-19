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

export const Chip = ({ children, onClick, clickable, variant = "contained" }: Props) => {
  const { events, cancel, ref } = useRipple(true, (!onClick && !clickable));

  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={cancel}
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden rounded-xl px-3 h-(--chip-height) flex items-center justify-center transition-colors",
        variant === "contained" && "bg-primary",
        variant === "outlined" && "c-border",
        (onClick || clickable) && "cursor-pointer select-none"
      )}
    >
      {children}
    </div>
  );
};

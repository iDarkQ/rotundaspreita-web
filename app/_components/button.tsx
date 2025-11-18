"use client";

import { ReactTag } from "@/app/_components/types/react-tag";
import { useRipple } from "@/app/_hooks/use-ripple";
import { Button as HeadlessUIButton } from "@headlessui/react";
import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

type ButtonVariant = "contained" | "outlined" | "text" | "warning";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  as?: ReactTag;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  className,
  disabled,
  as = "button",
  variant = "contained",
  ...rest
}: Props) => {
  const { events, ref, cancel } = useRipple(true, disabled);
  return (
    <HeadlessUIButton
      {...rest}
      ref={ref}
      as={as}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={() => cancel()}
      className={clsx(
        "min-h-(--btn-height) relative overflow-hidden rounded-sm px-3 py-1 cursor-pointer",
        disabled && "bg-button-disabled!",
        variant === "contained" && "bg-primary hover:bg-button-hover",
        variant === "outlined" && "c-border bg-transparent border-primary",
        "duration-200 transition-colors",
        "select-none",
        className && className
      )}
    >
      {children}
    </HeadlessUIButton>
  );
};

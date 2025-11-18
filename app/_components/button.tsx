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
        `button button-${variant}`,
        disabled &&
          "bg-button-disabled! border-button-disabled! cursor-not-allowed!",
        className && className
      )}
    >
      {children}
    </HeadlessUIButton>
  );
};

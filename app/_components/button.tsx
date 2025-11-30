"use client";

import { ReactTag } from "@/app/_components/types/react-tag";
import { useRipple } from "@/app/_hooks/use-ripple";
import { Button as HeadlessUIButton } from "@headlessui/react";
import clsx from "clsx";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

type ButtonVariant = "contained" | "outlined" | "text" | "warning";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  as?: ReactTag;
  variant?: ButtonVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export const Button = ({
  children,
  className,
  disabled,
  onClick,
  as = "button",
  variant = "contained",
  ...rest
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { events, ref, cancel, loadingAnimation } = useRipple(true, disabled || loading);

  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!onClick || disabled) return;

    const result = onClick(event);

    if (result instanceof Promise) {
      setLoading(true);
      result.finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      loadingAnimation();
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, loadingAnimation]);

  return (
    <HeadlessUIButton
      {...rest}
      ref={ref}
      as={as}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={() => cancel()}
      onClick={handleButtonClick}
      className={clsx(
        `button button-${variant}`,
        (disabled || loading) &&
          "bg-button-disabled! border-button-disabled! cursor-not-allowed!",
        className && className
      )}
    >
      {children}
    </HeadlessUIButton>
  );
};

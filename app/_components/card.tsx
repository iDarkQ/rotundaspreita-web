import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className, variant = "primary", ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "relative flex flex-col p-5",
        variant === "primary" && "c-border bg-white shadow-lg",
        variant === "secondary" && "bg-card-secondary rounded-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";

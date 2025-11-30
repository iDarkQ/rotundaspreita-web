import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className, variant = "primary", ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex flex-col p-5",
          variant === "primary" && "c-border shadow-lg bg-white",
          variant === "secondary" && "rounded-sm bg-card-secondary",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

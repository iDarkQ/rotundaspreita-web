import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative bg-white shadow-lg flex flex-col c-border p-5",
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

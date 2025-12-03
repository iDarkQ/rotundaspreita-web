import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  center?: boolean;
  className?: string;
}

export const Banner = ({ children, center, className }: Props) => (
  <div
    className={clsx(
      "c-border bg-white px-10 py-5 shadow-lg",
      center && "flex items-center justify-center",
      className && className,
    )}
  >
    {children}
  </div>
);

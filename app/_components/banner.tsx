import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Banner = ({ children, className }: Props) => (
  <div
    className={clsx("c-border bg-white shadow-lg px-10 py-5", className && className)}
  >
    {children}
  </div>
);

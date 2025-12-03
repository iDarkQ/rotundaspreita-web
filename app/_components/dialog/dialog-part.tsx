import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const DialogPart = ({ children, className }: Props) => (
  <div
    className={clsx("flex w-full flex-col gap-2 px-5", className && className)}
  >
    {children}
  </div>
);

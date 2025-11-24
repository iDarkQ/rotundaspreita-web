import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const DialogPart = ({ children, className }: Props) => (
  <div
    className={clsx("w-full px-5 flex flex-col gap-2", className && className)}
  >
    {children}
  </div>
);

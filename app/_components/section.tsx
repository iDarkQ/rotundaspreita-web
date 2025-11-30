import clsx from "clsx";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => (
  <section className="flex-1 w-full flex justify-center bg-background">
    <div
      className={clsx(
        "relative flex flex-col items-center justify-start gap-5",
        "max-w-(--breakpoint-2xl) w-[90%]! max-md:w-[95%]! mx-auto",
        className && className
      )}
    >
      {children}
    </div>
  </section>
);

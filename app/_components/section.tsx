import clsx from "clsx";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => (
  <section className="bg-background flex w-full flex-1 justify-center">
    <div
      className={clsx(
        "relative flex flex-col items-center justify-start gap-5",
        "mx-auto w-[90%]! max-w-(--breakpoint-2xl) max-md:w-[95%]!",
        className && className,
      )}
    >
      {children}
    </div>
  </section>
);

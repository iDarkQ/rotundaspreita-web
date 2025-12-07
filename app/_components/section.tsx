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
        "section-width relative flex flex-col items-center justify-start gap-5",
        className && className,
      )}
    >
      {children}
    </div>
  </section>
);

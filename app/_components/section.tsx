import clsx from "clsx";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => (
  <section className="w-full flex justify-center bg-background">
    <div
      className={clsx(
        "relative flex flex-col items-center justify-start w-full max-w-full sm:max-w-[90%] md:max-w-[80%] xl:max-w-7xl mx-auto gap-5",
        className && className
      )}
    >
      {children}
    </div>
  </section>
);

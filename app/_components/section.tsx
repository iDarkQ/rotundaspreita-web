import clsx from "clsx";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => (
  <section className="relative min-h-screen w-full flex justify-center bg-background overflow-hidden">
    <div
      className={clsx(
        "flex flex-col items-center justify-start w-full max-w-full sm:max-w-[90%] md:max-w-[80%] xl:max-w-7xl mx-auto gap-8 my-30",
        className && className
      )}
    >
      {children}
    </div>
  </section>
);

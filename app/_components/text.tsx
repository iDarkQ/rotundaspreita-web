import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "label" | "span" | "pre";
  children?: ReactNode;
  className?: string;
  center?: boolean;
}

const baseText = "font-roboto text-neutral text-base paragraph";
const baseHeading = "text-primary font-roboto font-[800]";
const styles = {
  p: baseText,
  label: baseText,
  span: baseText,
  pre: clsx(baseText, "bg-black/5 p-2 rounded-sm font-code! overflow-x-auto"),

  h1: clsx(
    `text-5xl ${baseHeading}`,
    `max-xs:text-2xl max-sm:text-3xl max-lg:text-4xl`
  ),
  h2: clsx(
    `text-4xl ${baseHeading}`,
    "max-xs:text-xl max-sm:text-2xl max-lg:text-3xl"
  ),
  h3: clsx(
    `text-3xl ${baseHeading}`,
    "max-xs:text-lg max-sm:text-xl max-lg:text-2xl"
  ),
  h4: clsx(
    `text-2xl ${baseHeading}`,
    "max-xs:text-base max-sm:text-lg max-lg:text-xl"
  ),
};

export const Text = ({ as = "p", children, center, className }: Props) => {
  const Component = as;
  return (
    <Component
      className={clsx(
        styles[as],
        center && "text-center",
        className && className
      )}
    >
      {children}
    </Component>
  );
};

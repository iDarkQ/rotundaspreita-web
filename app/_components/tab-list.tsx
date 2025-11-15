import { TabList as HeadlessUITabList } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const TabList = ({ children, className }: Props) => (
  <HeadlessUITabList
    className={clsx(
      "c-border border-transparent bg-tab-background flex flex-row gap-2 p-2 ",
      className && className
    )}
  >
    {children}
  </HeadlessUITabList>
);

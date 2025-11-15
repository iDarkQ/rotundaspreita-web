import { Text } from "@/app/_components/text";
import { Tab as HeadlessUITab } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  className?: string;
  label: string;
}

export const Tab = ({ className, label }: Props) => (
  <HeadlessUITab
    className={clsx(
      "cursor-pointer group outline-0 shadow-lg bg-white h-(--btn-height) flex-1 c-border border-transparent transition-colors",
      "data-selected:bg-primary",
      className && className
    )}
  >
    <Text as="p" className="group-data-selected:text-white!">
      {label}
    </Text>
  </HeadlessUITab>
);

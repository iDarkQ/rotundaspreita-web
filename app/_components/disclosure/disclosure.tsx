import {
  DisclosureProps,
  Disclosure as HeadlessUiDisclosure,
} from "@headlessui/react";
import clsx from "clsx";

interface Props extends DisclosureProps {
  className?: string;
}

export const Disclosure = ({ className, ...rest }: Props) => (
  <div
    className={clsx(
      "button button-outlined c-border cursor-default p-5",
      className && className,
    )}
  >
    <HeadlessUiDisclosure {...rest}>{rest.children}</HeadlessUiDisclosure>
  </div>
);

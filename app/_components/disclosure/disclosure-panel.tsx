import { Text } from "@/app/_components/text";
import {
  DisclosurePanelProps,
  DisclosurePanel as HeadlessUiDisclosurePanel,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props extends DisclosurePanelProps {
  children: ReactNode;
}

export const DisclosurePanel = ({ children, ...rest }: Props) => (
  <HeadlessUiDisclosurePanel
    {...rest}
    className={clsx("", rest.className && rest.className)}
  >
    <Text>{children}</Text>
  </HeadlessUiDisclosurePanel>
);

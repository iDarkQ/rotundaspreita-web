import { Text } from "@/app/_components/text";
import {
  DisclosureButtonProps,
  DisclosureButton as HeadlessUiDisclosureButton,
} from "@headlessui/react";
import clsx from "clsx";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

interface Props extends DisclosureButtonProps {
  children: string;
}

export const DisclosureButton = ({ children, ...rest }: Props) => (
  <HeadlessUiDisclosureButton
    {...rest}
    className={clsx(
      "group flex w-full cursor-pointer justify-between p-5",
      rest.className && rest.className,
    )}
  >
    <Text className="text-primary text-start font-bold">{children}</Text>
    <MdOutlineExpandMore
      size={20}
      className="group-data-[headlessui-state~='open']:hidden"
    />
    <MdOutlineExpandLess
      size={20}
      className="hidden group-data-[headlessui-state~='open']:block"
    />
  </HeadlessUiDisclosureButton>
);

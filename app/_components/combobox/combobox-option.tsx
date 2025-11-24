import {
  ComboboxOptionProps,
  ComboboxOption as HeadlessUIComboboxOption,
} from "@headlessui/react";
import clsx from "clsx";
import { IoMdCheckmark } from "react-icons/io";

export const ComboboxOption = ({ ...rest }: ComboboxOptionProps) => (
  <HeadlessUIComboboxOption
    {...rest}
    className={clsx(
      "group button button-outlined",
      "focus-visible:outline-none flex items-center p-2 gap-2 shadow-lg",
      rest.className && rest.className
    )}
  >
    <>
      <IoMdCheckmark
        size={20}
        className="invisible group-data-[headlessui-state~='selected']:visible"
      />
      {rest.children}
    </>
  </HeadlessUIComboboxOption>
);

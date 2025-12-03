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
      "flex items-center gap-2 p-2 shadow-lg focus-visible:outline-none",
      rest.className && rest.className,
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

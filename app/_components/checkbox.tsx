import {
  CheckboxProps,
  Checkbox as HeadlessUICheckbox,
} from "@headlessui/react";
import clsx from "clsx";
import { IoMdCheckmark } from "react-icons/io";

export const Checkbox = ({ ...rest }: CheckboxProps) => (
  <HeadlessUICheckbox
    {...rest}
    className={clsx(
      "group c-border data-checked:bg-primary flex h-(--checkbox-height) w-(--checkbox-height) items-center justify-center rounded-sm bg-white transition-colors",
      rest.className && rest.className,
    )}
  >
    <IoMdCheckmark
      className="stroke-white text-white! opacity-0 group-data-checked:opacity-100"
      size={20}
    />
  </HeadlessUICheckbox>
);

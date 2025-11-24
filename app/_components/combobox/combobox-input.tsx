import { Button } from "@/app/_components/button";
import {
  ComboboxButton,
  ComboboxInputProps,
  ComboboxInput as HeadlessUIComboboxInput,
} from "@headlessui/react";
import clsx from "clsx";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";

export const ComboboxInput = ({ ...rest }: ComboboxInputProps) => (
  <div className="relative">
    <HeadlessUIComboboxInput
      {...rest}
      className={clsx(
        "c-border h-(--input-height) w-full border-input focus-visible:outline-input-focus-visible! p-2",
        rest.className && rest.className
      )}
    />
    <ComboboxButton as={Fragment}>
      <Button className="group absolute inset-y-0 right-0 px-2.5" variant="text">
        <MdOutlineExpandMore
          size={20}
          className="group-data-[headlessui-state~='open']:hidden"
        />
        <MdOutlineExpandLess
          size={20}
          className="hidden group-data-[headlessui-state~='open']:block"
        />
      </Button>
    </ComboboxButton>
  </div>
);

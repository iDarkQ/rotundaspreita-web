"use client";

import { useRipple } from "@/app/_hooks/use-ripple";
import {
  ListboxOption as HeadlessUIListBoxOption,
  ListboxOptionProps,
} from "@headlessui/react";
import clsx from "clsx";
import { RefObject } from "react";

import { IoMdCheckmark } from "react-icons/io";

export const ListBoxOption = ({ ...rest }: ListboxOptionProps) => {
  const { ref } = useRipple(true);

  return (
    <HeadlessUIListBoxOption
      {...rest}
      ref={ref as RefObject<HTMLButtonElement | null>}
      className={clsx(
        "group button button-outlined",
        "focus-visible:outline-none flex items-center p-2 gap-2 shadow-lg",
        rest.className
      )}
    >
      <>
        <IoMdCheckmark
          size={20}
          className="invisible group-data-[headlessui-state~='selected']:visible"
        />
        {rest.children}
      </>
    </HeadlessUIListBoxOption>
  );
};

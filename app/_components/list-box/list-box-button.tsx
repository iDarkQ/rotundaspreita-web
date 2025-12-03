"use client";

import { useRipple } from "@/app/_hooks/use-ripple";
import {
  ListboxButton as HeadlessUIListBoxButton,
  ListboxButtonProps,
} from "@headlessui/react";
import clsx from "clsx";
import { RefObject } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";

export const ListBoxButton = ({ ...rest }: ListboxButtonProps) => {
  const { ref } = useRipple(true);

  return (
    <HeadlessUIListBoxButton
      {...rest}
      ref={ref as RefObject<HTMLButtonElement | null>}
      className={clsx(
        rest.className,
        "group flex items-center justify-between p-2 text-white focus-visible:outline-none",
        "button button-contained",
      )}
    >
      <>
        {rest.children}
        <MdOutlineExpandMore
          size={20}
          className="group-data-[headlessui-state~='open']:hidden"
        />
        <MdOutlineExpandLess
          size={20}
          className="hidden group-data-[headlessui-state~='open']:block"
        />
      </>
    </HeadlessUIListBoxButton>
  );
};

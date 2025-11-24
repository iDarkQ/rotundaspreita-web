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
  const { events, cancel, ref } = useRipple(true);

  return (
    <HeadlessUIListBoxButton
      {...rest}
      ref={ref as RefObject<HTMLButtonElement | null>}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={cancel}
      className={clsx(
        rest.className,
        "group focus-visible:outline-none text-white flex items-center justify-between p-2",
        "button button-contained"
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

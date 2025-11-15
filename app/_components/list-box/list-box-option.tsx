import { useRipple } from "@/app/_hooks/use-ripple";
import {
  ListboxOption as HeadlessUIListBoxOption,
  ListboxOptionProps,
} from "@headlessui/react";
import clsx from "clsx";
import { RefObject } from "react";

import { IoMdCheckmark } from "react-icons/io";

export const ListBoxOption = ({ ...rest }: ListboxOptionProps) => {
  const { events, cancel, ref } = useRipple(true);
  return (
    <HeadlessUIListBoxOption
      {...rest}
      ref={ref as RefObject<HTMLButtonElement | null>}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={cancel}
      className={clsx(
        rest.className,
        "group button button-outlined",
        "focus-visible:outline-none flex items-center p-2 gap-2 shadow-lg"
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

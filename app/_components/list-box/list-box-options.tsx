import {
  ListboxOptions as HeadlessUIListBoxOptions,
  ListboxOptionsProps,
} from "@headlessui/react";
import clsx from "clsx";

export const ListBoxOptions = ({ ...rest }: ListboxOptionsProps) => (
  <HeadlessUIListBoxOptions
    {...rest}
    transition
    modal={false}
    className={clsx(
      rest.className,
      "transition duration-200! data-leave:data-closed:opacity-0 data-enter:opacity-1",
      "focus-visible:outline-none c-border border-transparent bg-tab-background! w-(--button-width) flex flex-col p-2 gap-2 [--anchor-gap:--spacing(1)]"
    )}
  >
    {rest.children}
  </HeadlessUIListBoxOptions>
);

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
      "transition duration-200! data-enter:opacity-1 data-leave:data-closed:opacity-0",
      "c-border bg-tab-background! flex w-(--button-width) flex-col gap-2 border-transparent p-2 [--anchor-gap:--spacing(1)] focus-visible:outline-none",
      rest.className,
    )}
  >
    {rest.children}
  </HeadlessUIListBoxOptions>
);

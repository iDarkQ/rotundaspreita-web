import {
  ComboboxOptionsProps,
  ComboboxOptions as HeadlessUIComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

export const ComboboxOptions = ({ ...rest }: ComboboxOptionsProps) => (
  <HeadlessUIComboboxOptions
    {...rest}
    className={clsx(
      "w-(--input-width) empty:invisible transition duration-200! data-leave:data-closed:opacity-0 data-enter:opacity-1",
      "focus-visible:outline-none c-border border-transparent bg-tab-background! flex flex-col p-2 gap-2 [--anchor-gap:--spacing(1)]",
      rest.className && rest.className
    )}
  />
);

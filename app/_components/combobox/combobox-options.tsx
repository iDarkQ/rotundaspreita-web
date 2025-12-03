import {
  ComboboxOptionsProps,
  ComboboxOptions as HeadlessUIComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

export const ComboboxOptions = ({ ...rest }: ComboboxOptionsProps) => (
  <HeadlessUIComboboxOptions
    {...rest}
    className={clsx(
      "w-(--input-width) transition duration-200! empty:invisible data-enter:opacity-1 data-leave:data-closed:opacity-0",
      "c-border bg-tab-background! flex flex-col gap-2 border-transparent p-2 [--anchor-gap:--spacing(1)] focus-visible:outline-none",
      rest.className && rest.className,
    )}
  />
);

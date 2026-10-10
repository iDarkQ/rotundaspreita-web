import { Input as HeadlessUIInput, InputProps } from "@headlessui/react";
import clsx from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }: InputProps, ref) => (
    <HeadlessUIInput
      ref={ref}
      {...rest}
      className={clsx(
        "c-border border-input focus-visible:border-input-focus-visible h-(--input-height) bg-white p-2 focus-visible:outline-none",
        className && className,
      )}
    />
  ),
);

Input.displayName = "Input";

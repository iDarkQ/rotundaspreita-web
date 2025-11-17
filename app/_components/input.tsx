import { Input as HeadlessUIInput, InputProps } from "@headlessui/react";
import clsx from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }: InputProps, ref) => (
    <HeadlessUIInput
      ref={ref}
      {...rest}
      className={clsx(
        "c-border h-(--input-height) p-2 border-input focus-visible:outline-input-focus-visible!",
        clsx(className && className)
      )}
    />
  )
);

Input.displayName = "Input";

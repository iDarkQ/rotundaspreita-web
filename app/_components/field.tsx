import { Field as HeadlessUIField, FieldProps } from "@headlessui/react";
import clsx from "clsx";

export const Field = ({ className, ...rest }: FieldProps) => (
  <HeadlessUIField
    {...rest}
    className={clsx("flex flex-col", clsx(className && className))}
  />
);

import {
  Textarea as HeadlessUITextarea,
  TextareaProps,
} from "@headlessui/react";
import clsx from "clsx";
import { forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...rest }: TextareaProps, ref) => (
    <HeadlessUITextarea
      contentEditable={true}
      ref={ref}
      {...rest}
      className={clsx(
        "c-border border-input focus-visible:outline-input-focus-visible! h-auto p-2",
        className && className,
      )}
    />
  ),
);

Textarea.displayName = "Textarea";

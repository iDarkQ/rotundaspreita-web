import { Input as HeadlessUIInput, InputProps } from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent({ className, type, ...rest }: InputProps, ref) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === "password";
    const Icon = isPasswordVisible ? FiEyeOff : FiEye;

    const input = (
      <HeadlessUIInput
        ref={ref}
        {...rest}
        type={isPassword && isPasswordVisible ? "text" : type}
        className={clsx(
          "c-border border-input focus-visible:border-input-focus-visible h-(--input-height) bg-white p-2 focus-visible:outline-none",
          isPassword && "password-input w-full pr-10",
          className,
        )}
      />
    );

    if (!isPassword) return input;

    return (
      <div className="relative w-full">
        {input}
        <button
          type="button"
          className="text-neutral focus-visible:outline-primary absolute inset-y-0 right-0 flex items-center px-3 focus-visible:outline-2"
          aria-label={
            isPasswordVisible
              ? "Ocultar palavra-passe"
              : "Mostrar palavra-passe"
          }
          aria-pressed={isPasswordVisible}
          onClick={() => setIsPasswordVisible((visible) => !visible)}
        >
          <Icon aria-hidden="true" size={18} />
        </button>
      </div>
    );
  },
);

Input.displayName = "Input";

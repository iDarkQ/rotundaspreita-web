import { useRipple } from "@/app/_hooks/use-ripple";
import { Radio } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  value: string;
  selected?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export const RadioButton = ({ value, selected, children, onClick }: Props) => {
  const { ref, events, cancel } = useRipple(true);

  return (
    <Radio
      ref={ref}
      value={value}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={() => cancel()}
      onClick={onClick}
      className={clsx(
        "bg-white cursor-pointer select-none relative overflow-hidden flex items-center gap-2 c-border p-3",
        "hover:bg-toggle-button-hover!",
        selected &&
          "bg-toggle-button-selected! hover:bg-toggle-button-hover-selected!"
      )}
    >
      {children}
    </Radio>
  );
};

import { useRipple } from "@/app/_hooks/use-ripple";
import clsx from "clsx";
import { ReactNode, RefObject } from "react";
import { MdCheckCircle, MdDelete } from "react-icons/md";

interface Props {
  selected?: boolean;
  selectable: boolean;
  children: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const RadioButton = ({
  selected,
  selectable,
  children,
  onClick,
  onDelete,
  className,
}: Props) => {
  const { ref } = useRipple(true, !selectable);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      onClick={onClick}
      className={clsx(
        "c-border relative flex items-center gap-2 overflow-hidden p-3 select-none",
        selectable && "hover:bg-toggle-button-hover! cursor-pointer",
        selected ? "bg-toggle-button-selected" : "bg-white/25",
        selected && selectable && "hover:bg-toggle-button-hover-selected!",
        className && className,
      )}
    >
      {children}
      {selected && <MdCheckCircle size={20} className="text-primary h-auto" />}
      {onDelete && (
        <MdDelete
          size={20}
          className="h-auto text-red-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </div>
  );
};

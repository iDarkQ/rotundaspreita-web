import { useRipple } from "@/app/_hooks/use-ripple";
import { Radio } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  selected?: boolean;
  selectable: boolean;
  children: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
}

  selected,
  selectable,
  onDelete,

  return (
    <Radio
      ref={ref}
      value={value}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={() => cancel()}
      onClick={onClick}
      className={clsx(
        "bg-white select-none relative overflow-hidden flex items-center gap-2 c-border p-3",
        selectable && "hover:bg-toggle-button-hover! cursor-pointer",
        selected &&
          "bg-toggle-button-selected! hover:bg-toggle-button-hover-selected!"
      )}
    >
      {children}
      {selected && <MdCheckCircle size={20} className="text-primary" />}
      {onDelete && (
        <MdDelete
          size={20}
          className="text-red-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </div>
  );
};

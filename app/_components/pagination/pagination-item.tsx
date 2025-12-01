import { Text } from "@/app/_components/text";
import { useRipple } from "@/app/_hooks/use-ripple";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

interface Props {
  selected?: boolean;
  disabled?: boolean;
  type?: "next" | "previous" | "page";
  page?: number;
  onClick: () => void;
  className?: string;
}

export const PaginationItem = ({
  selected,
  disabled,
  onClick,
  className,
  type = "page",
  page = 1,
}: Props) => {
  const { events, cancel, ref } = useRipple(true, disabled);

  return (
    <Button
      ref={ref}
      onPointerDown={events}
      onPointerUp={events}
      onMouseLeave={cancel}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative overflow-hidden",
        "c-border border-pagination-item-border cursor-pointer rounded-sm transition-colors duration-200",
        "hover:bg-pagination-item-hover",
        "flex items-center justify-center",
        "h-(--pagination-item-height)! w-(--pagination-item-height)! shrink-0 aspect-square",
        disabled && "opacity-38 cursor-default!",
        className && className,
        selected &&
          "bg-pagination-item-selected! hover:bg-pagination-item-hover-selected!"
      )}
    >
      {type === "next" && <MdOutlineNavigateNext size="20px" />}
      {type === "previous" && <MdOutlineNavigateBefore size="20px" />}
      {type === "page" && <Text as="p">{page}</Text>}
    </Button>
  );
};

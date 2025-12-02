import { Text } from "@/app/_components/text";
import { useRipple } from "@/app/_hooks/use-ripple";
import { Button } from "@headlessui/react";
import clsx from "clsx";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

interface Props {
  selected?: boolean;
  disabled?: boolean;
  type?: "next" | "previous" | "page";
  color?: "success" | "error" | "default";
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
  color = "default",
  page = 1,
}: Props) => {
  const { ref } = useRipple(true, disabled);

  return (
    <Button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative overflow-hidden",
        "c-border border-pagination-item-border cursor-pointer rounded-sm transition-colors duration-200",
        "flex items-center justify-center",
        "h-(--pagination-item-height)! w-(--pagination-item-height)! shrink-0 aspect-square",
        disabled && "opacity-38 cursor-default!",
        "hover:bg-pagination-item-hover",
        color === "default" && "bg-white/25",
        color === "error" && "bg-error-bg",
        color === "success" && "bg-success-bg",
        selected
          && "bg-pagination-item-selected! hover:bg-pagination-item-hover-selected",
        className && className
      )}
    >
      {type === "next" && <MdOutlineNavigateNext size="20px" />}
      {type === "previous" && <MdOutlineNavigateBefore size="20px" />}
      {type === "page" && <Text as="p">{page}</Text>}
    </Button>
  );
};

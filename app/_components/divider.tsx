import clsx from "clsx";

interface Props {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export const Divider = ({ className, orientation = "horizontal" }: Props) => (
  <div
    className={clsx(
      "c-border",
      orientation === "horizontal"
        ? "h-0 w-full border-t-0!"
        : "h-full border-l-0!",
      className && className,
    )}
  />
);

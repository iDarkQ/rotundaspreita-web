import clsx from "clsx";

interface Props {
  orientation?: "vertical" | "horizontal";
}

export const Divider = ({ orientation = "horizontal" }: Props) => {
  return (
    <div
      className={clsx(
        "c-border",
        orientation === "horizontal"
          ? "h-0 w-full border-t-0!"
          : "w-0 h-full border-l-0!"
      )}
    />
  );
};

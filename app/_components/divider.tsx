import clsx from "clsx";
import { ReactNode } from "react";
import { Text } from "@/app/_components/text";

interface Props {
  orientation?: "vertical" | "horizontal";
  className?: string;
  text?: ReactNode;
}

export const Divider = ({
  className,
  orientation = "horizontal",
  text,
}: Props) =>
  text !== undefined && text !== null ? (
    <div
      className={clsx(
        "flex items-center gap-3",
        orientation === "horizontal" ? "w-full flex-row" : "h-full flex-col",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "c-border flex-1",
          orientation === "horizontal" ? "h-0 border-t-0!" : "w-0 border-l-0!",
        )}
      />
      <Text as="span" className="text-neutral whitespace-nowrap">
        {text}
      </Text>
      <span
        aria-hidden="true"
        className={clsx(
          "c-border flex-1",
          orientation === "horizontal" ? "h-0 border-t-0!" : "w-0 border-l-0!",
        )}
      />
    </div>
  ) : (
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

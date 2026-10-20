"use client";

import clsx from "clsx";
import { ReactNode, useId, useState } from "react";

interface Props {
  content: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

const alignment = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

export const Tooltip = ({
  content,
  children,
  align = "center",
  className,
}: Props) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={clsx("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        aria-describedby={id}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className="decoration-primary focus-visible:outline-primary cursor-help rounded-xs underline decoration-dotted underline-offset-4 focus-visible:outline-2"
      >
        {children}
      </span>
      {/* The padding bridges the gap so the tooltip stays open while hovered. */}
      <span
        id={id}
        role="tooltip"
        className={clsx(
          "absolute bottom-full z-30 pb-2 transition-opacity duration-150 motion-reduce:transition-none",
          alignment[align],
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <span className="bg-baltic-blue-950 block w-max max-w-64 rounded-sm p-3 text-sm leading-snug font-normal text-white shadow-lg sm:max-w-80">
          {content}
        </span>
      </span>
    </span>
  );
};

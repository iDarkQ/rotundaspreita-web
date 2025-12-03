import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  align: "left" | "right";
}

export const PositionedBlob = ({ children, align, className }: Props) => (
  <div className="pointer-events-none absolute h-full w-full">
    <div
      className={`absolute top-1/2 z-0 ${className} -translate-y-1/2 transform ${
        align === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      }`}
    >
      {children}
    </div>
  </div>
);

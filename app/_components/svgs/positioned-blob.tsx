import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  align: "left" | "right";
}

export const PositionedBlob = ({ children, align, className }: Props) => (
  <div className="absolute h-full w-full pointer-events-none">
    <div
      className={`absolute top-1/2 ${className} transform -translate-y-1/2 ${
        align === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
      }`}
    >
      {children}
    </div>
  </div>
);

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Chip = ({ children }: Props) => {
  return <div className="bg-primary rounded-xl px-3 h-(--chip-height) flex items-center justify-center">{children}</div>;
};

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const FooterGridItem = ({ children }: Props) => (
  <div className="col-span-1 flex flex-col gap-2">{children}</div>
);

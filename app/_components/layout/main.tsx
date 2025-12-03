import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => (
  <main className="flex min-h-screen flex-col gap-30 overflow-hidden py-30">
    {children}
  </main>
);

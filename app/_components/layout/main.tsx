import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => (
  <main className="flex flex-col overflow-hidden py-30 gap-30 min-h-screen">
    {children}
  </main>
);

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => (
  <main className="flex min-h-screen flex-col gap-30 overflow-hidden pt-[calc(var(--navbar-height)+1.25rem)] pb-30">
    {children}
  </main>
);

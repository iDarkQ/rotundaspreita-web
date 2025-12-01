import { Footer } from "@/app/_components/layout/footer/footer";
import { Main } from "@/app/_components/layout/main";
import { Navbar } from "@/app/_components/layout/navbar/navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <Main>{children}</Main>
    <Footer />
  </>
);

import { Divider } from "@/app/_components/divider";
import { FooterGrid } from "@/app/_components/layout/footer/footer-grid/footer-grid";
import { FooterBasic } from "@/app/_components/layout/footer/footer-basic/footer-basic";

export const Footer = () => (
  <footer className="bg-primary relative z-8 flex h-auto flex-col items-center justify-center">
    <FooterGrid />
    <Divider />
    <FooterBasic />
  </footer>
);

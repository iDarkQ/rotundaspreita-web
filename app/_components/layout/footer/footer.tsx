import { Divider } from "@/app/_components/divider";
import { FooterGrid } from "@/app/_components/layout/footer/footer-grid/footer-grid";
import { FooterBasic } from "@/app/_components/layout/footer/footer-basic/footer-basic";

export const Footer = () => (
  <div className="bg-primary relative z-1000 flex h-auto flex-col items-center justify-center">
    <FooterGrid />
    <Divider />
    <FooterBasic />
  </div>
);

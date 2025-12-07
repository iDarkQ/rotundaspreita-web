import { FooterGridItemContact } from "@/app/_components/layout/footer/footer-grid/footer-grid-item-contact";
import { FooterGridItemPages } from "@/app/_components/layout/footer/footer-grid/footer-grid-item-pages";
import { FooterGridItemRotundaspreita } from "@/app/_components/layout/footer/footer-grid/footer-grid-item-rotundaspreita";

export const FooterGrid = () => (
  <div className="section-width grid grid-cols-3 flex-col gap-10 p-10 max-lg:flex max-lg:gap-5">
    <FooterGridItemRotundaspreita />
    <FooterGridItemPages />
    <FooterGridItemContact />
  </div>
);

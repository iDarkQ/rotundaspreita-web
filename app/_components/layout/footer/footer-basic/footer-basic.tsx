import { FooterBasicList } from "@/app/_components/layout/footer/footer-basic/footer-basic-list";
import { FooterBasicText } from "@/app/_components/layout/footer/footer-basic/footer-basic-text";

export const FooterBasic = () => (
  <div className="section-width flex w-full flex-row justify-between gap-5 p-10 max-xl:flex-col max-xl:items-center max-lg:gap-5">
    <FooterBasicText />
    <FooterBasicList />
  </div>
);

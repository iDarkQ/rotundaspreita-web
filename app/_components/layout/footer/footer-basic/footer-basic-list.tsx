import { FooterBasicItem } from "@/app/_components/layout/footer/footer-basic/footer-basic-item";

export const FooterBasicList = () => (
  <ul className="flex gap-2">
    <FooterBasicItem link="/privacy-policy" label="Política de Privacidade" />
    <FooterBasicItem link="mailto:rotundaspreita@gmail.com" label="Contacto" />
  </ul>
);

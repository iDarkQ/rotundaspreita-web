import { FooterItem } from "@/app/_components/layout/footer/footer-item";
import { FooterText } from "@/app/_components/layout/footer/footer-text";

export const Footer = () => (
  <div className="bg-primary relative z-1000 flex h-auto flex-col items-center justify-center gap-2 p-10">
    <ul className="flex gap-2">
      <FooterItem link="/privacy-policy" label="Política de Privacidade" />
      <FooterItem link="mailto:rotundaspreita@gmail.com" label="Contacto" />
    </ul>
    <FooterText />
  </div>
);

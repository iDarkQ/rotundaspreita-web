import Image from "next/image";
import Logo from "@/public/favico.svg";

export const NavbarLogoImage = () => (
  <Image src={Logo.src} alt="ROTUNDÁSPREITA Logo" width={60} height={60} />
);

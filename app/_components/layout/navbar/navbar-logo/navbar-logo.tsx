import { NavbarLogoImage } from "@/app/_components/layout/navbar/navbar-logo/navbar-logo-image";
import { NavbarLogoText } from "@/app/_components/layout/navbar/navbar-logo/navbar-logo-text";
import { Link } from "@/app/_components/link";
import { RouteNames } from "@/app/_utils/route-names";

export const NavbarLogo = () => (
  <Link link={RouteNames.HOME} className="flex items-center gap-2" hideStyles>
    <NavbarLogoImage />
    <NavbarLogoText />
  </Link>
);

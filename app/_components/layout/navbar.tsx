import { Button } from "@/app/_components/button";
import { NavbarItem } from "@/app/_components/layout/navbar-item";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import Logo from "@/public/favico.svg";
import { RouteNames } from "@/utils/route-names";
import Image from "next/image";

export const Navbar = async () => {
  const user = await fetchLoggedUser();

  return (
    <div className="flex flex-row justify-between fixed h-25 w-full bg-transparent z-10 p-5 backdrop-blur-lg">
      <Link
        link={RouteNames.HOME}
        className="flex items-center gap-2"
        hideStyles
      >
        <Image
          src={Logo.src}
          alt="ROTUNDÁSPREITA Logo"
          width={60}
          height={60}
        />
        <Text className="text-2xl! font-extrabold text-primary!">
          ROTUNDÁSPREITA
        </Text>
      </Link>
      <ul className="flex flex-row gap-2 h-full items-center">
        <NavbarItem path={RouteNames.HOME} name="Início" />
        {/* <nav>
          <Button as="li" variant="text">
            <Link
              link="/con
              tacts"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Contacts
            </Link>
          </Button>
        </nav> */}
        <NavbarItem path={RouteNames.FAQ} name="Ajuda" />
        <NavbarItem path={RouteNames.QUESTIONS} name="Biblioteca" />
        {user ? (
          <NavbarItem path={RouteNames.PANEL} name="Perfil" contained />
        ) : (
          <NavbarItem path={RouteNames.LOGIN} name="Entrar" contained />
        )}
      </ul>
    </div>
  );
};

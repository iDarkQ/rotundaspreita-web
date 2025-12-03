"use client";

import { NavbarSettingsItem } from "@/app/_components/layout/navbar/navbar-items-list/navbar-settings-item";
import { NavbarItem } from "@/app/_components/layout/navbar/navbar-items-list/navbar-item";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { RouteNames } from "@/app/_utils/route-names";
import clsx from "clsx";

interface Props {
  className?: string;
}

export const NavbarItemsList = ({ className }: Props) => {
  const { user } = useNavbarManager();
  return (
    <ul
      className={clsx(
        "flex h-full flex-row items-center gap-2 max-lg:hidden",
        className && className,
      )}
    >
      <NavbarItem path={RouteNames.HOME} name="Início" />
      <NavbarItem path={RouteNames.FAQ} name="Ajuda" />
      {user ? (
        <>
          <NavbarItem path={RouteNames.QUESTIONS} name="Biblioteca" />
          <NavbarItem path={RouteNames.PANEL} name="Perfil" contained />
          <NavbarSettingsItem />
        </>
      ) : (
        <NavbarItem path={RouteNames.LOGIN} name="Entrar" contained />
      )}
    </ul>
  );
};

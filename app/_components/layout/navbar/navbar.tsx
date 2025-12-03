import { NavbarExpandItem } from "@/app/_components/layout/navbar/navbar-expand-item";
import { NavbarLogo } from "@/app/_components/layout/navbar/navbar-logo/navbar-logo";
import { NavbarItemsList } from "@/app/_components/layout/navbar/navbar-items-list/navbar-items-list";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { NavbarManagerProvider } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { fetchLoggedUserSubscription } from "@/app/_services/subscription-service";

export const Navbar = async () => {
  const user = await fetchLoggedUser();
  const subscription = user ? await fetchLoggedUserSubscription() : null;

  return (
    <NavbarManagerProvider subscription={subscription} user={user ?? undefined}>
      <div className="fixed z-10 flex h-(--navbar-height) w-full flex-row justify-between bg-transparent p-5 backdrop-blur-lg">
        <NavbarLogo />

        <NavbarItemsList />
      </div>
      <NavbarExpandItem />
    </NavbarManagerProvider>
  );
};

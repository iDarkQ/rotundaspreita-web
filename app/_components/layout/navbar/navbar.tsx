import { NavbarExpandItem } from "@/app/_components/layout/navbar/navbar-expand-item";
import { NavbarLogo } from "@/app/_components/layout/navbar/navbar-logo/navbar-logo";
import { NavbarItemsList } from "@/app/_components/layout/navbar/navbar-items-list/navbar-items-list";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { NavbarManagerProvider } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { fetchLoggedUserSubscription } from "@/services/subscription-service";

export const Navbar = async () => {
  const user = await fetchLoggedUser();
  const subscription = user ? await fetchLoggedUserSubscription() : null;

  return (
    <NavbarManagerProvider subscription={subscription} user={user ?? undefined}>
      <div className="flex flex-row justify-between fixed h-(--navbar-height) w-full bg-transparent z-10 p-5 backdrop-blur-lg">
        <NavbarLogo />

        <NavbarItemsList />
      </div>
      <NavbarExpandItem />
    </NavbarManagerProvider>
  );
};

import { Button } from "@/app/_components/button";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { Link } from "@/app/_components/link";
import clsx from "clsx";

interface Props {
  path: string;
  name: string;
  contained?: boolean;
}

export const NavbarItem = ({ path, name, contained = false }: Props) => {
  const { setExpanded } = useNavbarManager();

  return (
    <li>
      <Link
        link={path}
        className={clsx(
          "text-2xl!",
          !contained && "text-primary! hover:text-black!",
          contained && "hover:text-neutral text-white!",
        )}
        hideStyles
      >
        <Button
          as="nav"
          variant={contained ? "contained" : "text"}
          onClick={() => setExpanded(false)}
        >
          {name}
        </Button>
      </Link>
    </li>
  );
};

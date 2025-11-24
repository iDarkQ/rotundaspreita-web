import { Button } from "@/app/_components/button";
import { Link } from "@/app/_components/link";
import clsx from "clsx";

interface Props {
  path: string;
  name: string;
  contained?: boolean;
}

export const NavbarItem = ({ path, name, contained = false }: Props) => (
  <nav>
    <Button as="li" variant={contained ? "contained" : "text"}>
      <Link
        link={path}
        className={clsx(
          "text-2xl!",
          !contained && "text-primary! hover:text-black!",
          contained && "text-white! hover:text-neutral"
        )}
        hideStyles
      >
        {name}
      </Link>
    </Button>
  </nav>
);

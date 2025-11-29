import { Button } from "@/app/_components/button";
import { MdSettings } from "react-icons/md";

interface Props {
  onClick: () => void;
}

export const NavbarSettingsButton = ({ onClick }: Props) => (
  <nav>
    <Button variant="text" onClick={onClick}>
      <MdSettings size={30} className="text-primary" />
    </Button>
  </nav>
);

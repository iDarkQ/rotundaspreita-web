import { Link } from "@/app/_components/link";

interface Props {
  link: string;
  label: string;
}

export const FooterItem = ({ link, label }: Props) => (
  <nav>
    <li>
      <Link link={link}>{label}</Link>
    </li>
  </nav>
);

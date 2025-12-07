import { Link } from "@/app/_components/link";

interface Props {
  link: string;
  label: string;
}

export const FooterBasicItem = ({ link, label }: Props) => (
  <li>
    <Link link={link}>{label}</Link>
  </li>
);

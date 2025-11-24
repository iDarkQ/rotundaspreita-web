import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";

export const Footer = () => (
  <div className="relative h-auto bg-primary flex flex-col items-center justify-center gap-2 p-10 z-1000">
    <ul className="flex gap-2">
      <nav>
        <li>
          <Link link="/privacy-policy">Política de Privacidade</Link>
        </li>
      </nav>
      <nav>
        <li>
          <Link link="mailto:rotundaspreita@gmail.com" isExternalLink={true}>
            Contacto
          </Link>
        </li>
      </nav>
    </ul>
    <Text as="p" className="text-center text-2xl font-bold text-white">
      Copyright © ROTUNDÁSPREITA | All rights reserved
    </Text>
  </div>
);

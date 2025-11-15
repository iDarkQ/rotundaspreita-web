import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";

export const Footer = () => {
  return (
    <div className="h-auto bg-primary flex flex-col items-center justify-center gap-2 p-10">
      <div>
        <ul>
          <nav>
            <li>
              <Link link="/privacy-policy">Privacy Policy</Link>
            </li>
          </nav>
        </ul>
      </div>
      <Text as="p" className="text-center text-2xl font-bold text-white">
        Copyright © Bom Diretor | All rights reserved
      </Text>
    </div>
  );
};

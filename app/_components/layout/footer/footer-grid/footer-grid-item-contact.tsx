import { FooterGridItem } from "@/app/_components/layout/footer/footer-grid/footer-grid-item";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";

export const FooterGridItemContact = () => (
  <FooterGridItem>
    <Text className="font-bold! text-white!">Contacto</Text>
    <Link link="tel:+351927402792">
      <Text className="text-white">+351 927 402 792</Text>
    </Link>
    <Link link="mailto:rotundaspreita@gmail.com">
      <Text className="text-white">rotundaspreita@gmail.com</Text>
    </Link>
  </FooterGridItem>
);

import { FooterGridItem } from "@/app/_components/layout/footer/footer-grid/footer-grid-item";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { RouteNames } from "@/app/_utils/route-names";

export const FooterGridItemPages = () => (
  <FooterGridItem>
    <Text className="font-bold! text-white!">Páginas</Text>
    <Link link={RouteNames.HOME}>
      <Text className="text-white">Início</Text>
    </Link>
    <Link link={RouteNames.FAQ}>
      <Text className="text-white">Perguntas Frequentes</Text>
    </Link>
    <Link link={RouteNames.LOGIN}>
      <Text className="text-white">Login</Text>
    </Link>
  </FooterGridItem>
);

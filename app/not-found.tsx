import { Button } from "@/app/_components/button";
import { Link } from "@/app/_components/link";
import { Section } from "@/app/_components/section";
import { Text } from "@/app/_components/text";
import { RouteNames } from "@/utils/route-names";

export default function NotFound() {
  return (
    <Section className="items-center! justify-center!">
      <Text as="h1" center>
        Página Não Encontrada
      </Text>
      <Text as="p" center>
        A página que você procura não existe ou foi removida. Verifique o
        endereço digitado ou volte para a página inicial.
      </Text>
      <Link link={RouteNames.HOME}>
        <Button>
          <Text className="text-white!">Voltar à página inicial</Text>
        </Button>
      </Link>
    </Section>
  );
}

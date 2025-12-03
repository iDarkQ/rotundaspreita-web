import { Button } from "@/app/_components/button";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { RouteNames } from "@/app/_utils/route-names";

export const HeroActions = () => (
  <div className="flex gap-2">
    <Link link="#purchase">
      <Button variant="contained">
        <Text className="text-white!">Ver Plano</Text>
      </Button>
    </Link>
    <Link link={RouteNames.LOGIN}>
      <Button variant="outlined">
        <Text className="text-primary!">Registe-se para um teste gratuito</Text>
      </Button>
    </Link>
  </div>
);

import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";

interface Props {
  checkoutUrl: string;
}

export const PanelRenewSubscriptionButton = ({ checkoutUrl }: Props) => (
  <Link
    link={checkoutUrl}
    isExternalLink
    hideStyles
    className="button button-contained inline-flex items-center justify-center"
  >
    <Text className="text-white!">Renovar Subscrição</Text>
  </Link>
);

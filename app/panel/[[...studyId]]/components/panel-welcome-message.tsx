import { Text } from "@/app/_components/text";

interface Props {
  name: string;
}

export const PanelWelcomeMessage = ({ name }: Props) => (
  <Text as="p" className="text-primary!">
    Bem-vindo de volta, {name}
  </Text>
);

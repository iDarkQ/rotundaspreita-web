import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";

interface Props {
  onClick: () => void;
}

export const PanelTestMenuBlockAction = ({ onClick }: Props) => (
  <Button variant="outlined" onClick={onClick}>
    <Text>Faça um teste grátis</Text>
  </Button>
);

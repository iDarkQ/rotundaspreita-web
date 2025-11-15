import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import clsx from "clsx";

interface Props {
  name: string;
  value: string;
  className?: string;
}

export const StatisticsCard = ({ name, value, className }: Props) => (
  <Card className={clsx("gap-2", className && className)}>
    <Text as="p">{name}</Text>
    <Text as="h2">{value}</Text>
  </Card>
);

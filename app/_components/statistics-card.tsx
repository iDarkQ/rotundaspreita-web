import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import { Tooltip } from "@/app/_components/tooltip";
import clsx from "clsx";

interface Props {
  name: string;
  value: string;
  hint?: string;
  className?: string;
}

export const StatisticsCard = ({ name, value, hint, className }: Props) => (
  <Card className={clsx(className && className)}>
    <Text as="p">
      {hint ? (
        <Tooltip align="start" content={hint}>
          {name}
        </Tooltip>
      ) : (
        name
      )}
    </Text>
    <Text as="h2">{value}</Text>
  </Card>
);

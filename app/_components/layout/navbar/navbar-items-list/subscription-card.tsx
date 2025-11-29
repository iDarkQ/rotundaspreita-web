import { Card } from "@/app/_components/card";
import { Chip } from "@/app/_components/chip";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Text } from "@/app/_components/text";

import dayjs from "dayjs";

interface Props {
  active: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export const SubscriptionCard = ({ active, createdAt, expiresAt }: Props) => {
  const today = dayjs();
  const start = dayjs(createdAt);
  const end = dayjs(expiresAt);

  const totalDays = end.diff(start, "day");
  const elapsedDays = today.diff(start, "day");
  const progressValue = Math.min(elapsedDays, totalDays);

  return (
    <Card variant="secondary" className="gap-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Text as="h4">Subscription Plan</Text>
          <Text>2.99€ · monthly</Text>
        </div>
        <Chip>
          <Text className="text-white!">{active ? "Active" : "Inactive"}</Text>
        </Chip>
      </div>
      <ProgressBar
        value={progressValue}
        max={totalDays}
        info={`${Math.round((progressValue / totalDays) * 100)}%`}
        label="Progresso"
      />
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <Text>Purchased</Text>
          <Text className="text-primary! font-bold">
            {start.format("D MMMM YYYY")}
          </Text>
        </div>
        <div className="flex flex-col">
          <Text>Next Payment</Text>
          <Text className="text-primary! font-bold">
            {end.format("D MMMM YYYY")}
          </Text>
        </div>
      </div>
    </Card>
  );
};

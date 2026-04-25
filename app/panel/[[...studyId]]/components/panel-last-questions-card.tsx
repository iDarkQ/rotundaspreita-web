import { Card } from "@/app/_components/card";
import { Chip } from "@/app/_components/chip";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Text } from "@/app/_components/text";

export const PanelLastQuestionsCard = () => (
  <Card className="w-full gap-2">
    <div className="flex flex-row items-center justify-between">
      <Text as="p" className="text-primary">
        <strong>
          Visualize as últimas 30 questões com gabarito, sua resposta e
          explicação.
        </strong>
      </Text>
      <div className="flex gap-1">
        <Chip color="success" className="text-success">
          Corretos 9
        </Chip>
        <Chip color="error" className="text-error">
          Errados 20
        </Chip>
        <Chip color="neutral" className="text-neutral">
          Em Branco 1
        </Chip>
      </div>
    </div>
    <ProgressBar label="Aproveitamento" value={60} max={100} />
  </Card>
);

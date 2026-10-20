import { Card } from "@/app/_components/card";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { ExamCountdownDto } from "@/app/_lib/dtos/test-results/readiness.dto";
import { RouteNames } from "@/app/_utils/route-names";
import clsx from "clsx";

interface Props {
  countdown: ExamCountdownDto;
  className?: string;
}

const formatExamDate = (examDate: string) =>
  new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${examDate}T12:00:00Z`));

const pluralize = (value: number, singular: string, plural: string) =>
  `${value} ${value === 1 ? singular : plural}`;

export const PanelExamCountdown = ({
  countdown,
  className,
}: Props) => (
  <Card className={clsx("gap-3", className)}>
    <Text as="p">Contagem decrescente do exame</Text>

    {countdown.status === "upcoming" && (
      <>
        <Text as="h2">
          {countdown.daysLeft === 1
            ? "Falta 1 dia"
            : `Faltam ${countdown.daysLeft} dias`}
        </Text>
        <Text>
          {formatExamDate(countdown.examDate)}
          {countdown.weeksLeft > 0 &&
            ` · cerca de ${pluralize(countdown.weeksLeft, "semana", "semanas")}`}
        </Text>
        {countdown.questionsPerDay !== null && (
          <Text className="text-sm opacity-80">
            Para ver todas as perguntas até ao exame:{" "}
            {`cerca de ${pluralize(countdown.questionsPerDay, "pergunta", "perguntas")} por dia`}
            .
          </Text>
        )}
      </>
    )}

    {countdown.status === "today" && (
      <>
        <Text as="h2">O exame é hoje</Text>
        <Text>Boa sorte! Confie na sua preparação.</Text>
      </>
    )}

    {countdown.status === "past" && (
      <>
        <Text as="h2">A data do exame já passou</Text>
        <Text>
          Atualize a data para continuar a acompanhar a sua preparação.
        </Text>
      </>
    )}

    {countdown.status === "none" && (
      <>
        <Text as="h2">Defina a data do exame</Text>
        <Text>
          Assim mostramos quanto tempo falta e ajudamos a planear o estudo.
        </Text>
      </>
    )}

    <Link link={RouteNames.NOTIFICATIONS} className="text-primary! mt-auto">
      {countdown.status === "none" ? "Definir data" : "Alterar data"}
    </Link>
  </Card>
);

import { Card } from "@/app/_components/card";
import { Link } from "@/app/_components/link";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Text } from "@/app/_components/text";
import { Tooltip } from "@/app/_components/tooltip";
import {
  ReadinessBand,
  ReadinessDto,
} from "@/app/_lib/dtos/test-results/readiness.dto";
import {
  CONSISTENCY_WEEKS,
  RECENT_ANSWERS_WINDOW,
} from "@/app/_utils/readiness";
import clsx from "clsx";

interface Props {
  readiness: ReadinessDto;
  className?: string;
}

const bands: Record<ReadinessBand, { label: string; className: string }> = {
  "not-ready": { label: "Ainda não está pronto", className: "text-error" },
  "on-track": { label: "A caminho", className: "text-neutral" },
  almost: { label: "Quase pronto", className: "text-primary" },
  ready: { label: "Pronto para o exame", className: "text-success" },
};

export const PanelReadinessCard = ({ readiness, className }: Props) => {
  const {
    unlocked,
    score,
    band,
    totalAnswers,
    minimumAnswers,
    nextStep,
    studyId,
  } = readiness;
  const bandInfo = band ? bands[band] : null;

  return (
    <Card className={clsx("gap-5", className)}>
      <Text as="p">Preparação para o exame</Text>

      {unlocked && score !== null && bandInfo ? (
        <Text as="h2" className="flex flex-wrap items-baseline gap-x-4">
          <Tooltip
            align="start"
            content={`A pontuação combina três fatores: 40% cobertura (${readiness.coverage}%), 40% precisão recente (${readiness.accuracy}%) e 20% consistência (${readiness.consistency}%).`}
          >
            {score}/100
          </Tooltip>
          <span className={bandInfo.className}>
            <Tooltip
              align="start"
              content={
                <>
                  <span className="block">
                    Abaixo de 40: Ainda não está pronto
                  </span>
                  <span className="block">40 a 69: A caminho</span>
                  <span className="block">70 a 84: Quase pronto</span>
                  <span className="block">85 ou mais: Pronto para o exame</span>
                </>
              }
            >
              {bandInfo.label}
            </Tooltip>
          </span>
        </Text>
      ) : (
        <ProgressBar
          label="Perguntas respondidas para desbloquear a pontuação"
          value={Math.min(totalAnswers, minimumAnswers)}
          max={minimumAnswers}
        />
      )}

      {unlocked && (
        <div className="flex flex-col gap-3">
          <ProgressBar
            label="Cobertura das perguntas"
            hint={`Perguntas diferentes que já respondeu a dividir pelo total do estudo. Ainda faltam ${readiness.unseenQuestions} por ver.`}
            value={readiness.coverage}
            max={100}
            info={`${readiness.coverage}%`}
          />
          <ProgressBar
            label="Precisão recente"
            hint={`Percentagem de respostas corretas nas suas últimas ${RECENT_ANSWERS_WINDOW} respostas. Perguntas em branco contam como erradas.`}
            value={readiness.accuracy}
            max={100}
            info={`${readiness.accuracy}%`}
          />
          <ProgressBar
            label="Consistência"
            hint={`Testes feitos nas últimas ${CONSISTENCY_WEEKS} semanas a dividir por ${CONSISTENCY_WEEKS * readiness.weeklyGoal} (${CONSISTENCY_WEEKS} semanas × o seu objetivo de ${readiness.weeklyGoal} testes por semana). O máximo é 100%.`}
            value={readiness.consistency}
            max={100}
            info={`${readiness.consistency}%`}
          />
        </div>
      )}

      <div className="flex flex-col items-start gap-2">
        <Text>{nextStep}</Text>
        {!unlocked && (
          <Link
            link={`/test?${new URLSearchParams({ s: studyId, d: "all" }).toString()}`}
            className="text-primary!"
          >
            Fazer um teste
          </Link>
        )}
      </div>
    </Card>
  );
};

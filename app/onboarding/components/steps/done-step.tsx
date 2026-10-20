import { WEEKDAYS } from "@/app/_components/reminder-weekday-picker";
import { Text } from "@/app/_components/text";
import { OnboardingStep } from "@/app/onboarding/components/onboarding-step";
import { MdCheckCircle } from "react-icons/md";

interface Props {
  direction: "forward" | "backward";
  examDate: string | null;
  weeklyGoal: number;
  remindersActive: boolean;
  weekdays: number[];
  time: string;
  pushError: string | null;
}

const formatExamDate = (examDate: string) =>
  new Intl.DateTimeFormat("pt-PT", { dateStyle: "long" }).format(
    new Date(`${examDate}T12:00:00`),
  );

export const DoneStep = ({
  direction,
  examDate,
  weeklyGoal,
  remindersActive,
  weekdays,
  time,
  pushError,
}: Props) => {
  const dayLabels = WEEKDAYS.filter(({ value }) => weekdays.includes(value))
    .map(({ label }) => label)
    .join(", ");

  return (
    <OnboardingStep
      direction={direction}
      title="Tudo pronto!"
      description="O seu plano de estudo está guardado."
    >
      <div className="flex flex-col gap-4">
        <ul className="c-border flex flex-col gap-3 bg-white p-4">
          {[
            examDate
              ? `Exame: ${formatExamDate(examDate)}`
              : "Exame: data ainda por definir",
            `Objetivo: ${weeklyGoal} ${weeklyGoal === 1 ? "teste" : "testes"} por semana`,
            remindersActive
              ? `Lembretes: ${dayLabels} às ${time}`
              : "Lembretes: desativados",
          ].map((line) => (
            <li key={line} className="flex items-center gap-2">
              <MdCheckCircle
                aria-hidden="true"
                size={20}
                className="text-primary shrink-0"
              />
              <Text as="span">{line}</Text>
            </li>
          ))}
        </ul>
        {pushError && (
          <div role="alert">
            <Text as="p" className="text-error!">
              Não foi possível ativar as notificações push. {pushError} Pode
              tentar novamente em Notificações.
            </Text>
          </div>
        )}
      </div>
    </OnboardingStep>
  );
};

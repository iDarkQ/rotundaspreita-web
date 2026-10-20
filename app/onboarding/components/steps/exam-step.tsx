import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { OnboardingOption } from "@/app/onboarding/components/onboarding-option";
import { OnboardingStep } from "@/app/onboarding/components/onboarding-step";

interface Props {
  direction: "forward" | "backward";
  examDate: string;
  examUnknown: boolean;
  onExamDateChange: (value: string) => void;
  onExamUnknownChange: (value: boolean) => void;
}

export const ExamStep = ({
  direction,
  examDate,
  examUnknown,
  onExamDateChange,
  onExamUnknownChange,
}: Props) => (
  <OnboardingStep
    direction={direction}
    title="Quando é o seu exame?"
    description="Com a data, mantemos o seu plano de estudo focado no que falta."
  >
    <div className="flex flex-col gap-4">
      <Field className="gap-2">
        <Text as="label" htmlFor="onboarding-exam-date">
          Data do exame
        </Text>
        <Input
          id="onboarding-exam-date"
          type="date"
          value={examDate}
          onChange={(event) => onExamDateChange(event.target.value)}
        />
      </Field>
      <OnboardingOption
        type="checkbox"
        selected={examUnknown}
        title="Ainda não sei a data"
        description="Sem problema, pode indicá-la mais tarde em Notificações."
        onClick={() => onExamUnknownChange(!examUnknown)}
      />
    </div>
  </OnboardingStep>
);

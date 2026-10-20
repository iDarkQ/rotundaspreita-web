import { OnboardingOption } from "@/app/onboarding/components/onboarding-option";
import { OnboardingStep } from "@/app/onboarding/components/onboarding-step";

interface Props {
  direction: "forward" | "backward";
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export const PushStep = ({ direction, value, onChange }: Props) => (
  <OnboardingStep
    direction={direction}
    title="Quer receber lembretes?"
    description="Enviamos uma notificação push neste navegador para o ajudar a cumprir o seu objetivo."
  >
    <div
      role="radiogroup"
      aria-label="Lembretes por notificação push"
      className="flex flex-col gap-3"
    >
      <OnboardingOption
        selected={value === true}
        title="Sim, quero lembretes"
        description="Vai escolher os dias e a hora no passo seguinte."
        onClick={() => onChange(true)}
      />
      <OnboardingOption
        selected={value === false}
        title="Agora não"
        description="Pode ativá-los mais tarde em Notificações."
        onClick={() => onChange(false)}
      />
    </div>
  </OnboardingStep>
);

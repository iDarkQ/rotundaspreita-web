import { OnboardingOption } from "@/app/onboarding/components/onboarding-option";
import { OnboardingStep } from "@/app/onboarding/components/onboarding-step";

interface Props {
  direction: "forward" | "backward";
  value: number;
  onChange: (value: number) => void;
}

const goals = [
  { value: 1, title: "1 teste", description: "Para começar com calma." },
  {
    value: 3,
    title: "3 testes",
    description: "Um ritmo equilibrado.",
    badge: "Recomendado",
  },
  { value: 5, title: "5 testes", description: "Para uma preparação intensa." },
  { value: 7, title: "7 testes", description: "Um teste por dia." },
];

export const GoalStep = ({ direction, value, onChange }: Props) => (
  <OnboardingStep
    direction={direction}
    title="Quantos testes quer fazer por semana?"
    description="Escolha um objetivo realista. Pode alterá-lo quando quiser."
  >
    <div
      role="radiogroup"
      aria-label="Objetivo semanal"
      className="grid gap-3 sm:grid-cols-2"
    >
      {goals.map((goal) => (
        <OnboardingOption
          key={goal.value}
          selected={value === goal.value}
          title={goal.title}
          description={goal.description}
          badge={goal.badge}
          onClick={() => onChange(goal.value)}
        />
      ))}
    </div>
  </OnboardingStep>
);

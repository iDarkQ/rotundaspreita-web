import { Card } from "@/app/_components/card";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Text } from "@/app/_components/text";
import {
  MdCheckCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ReactNode } from "react";

interface PanelLastQuestionsCardProps {
  correct: number;
  wrong: number;
  blank: number;
  total: number;
}

export const PanelLastQuestionsCard = ({
  correct,
  wrong,
  blank,
  total,
}: PanelLastQuestionsCardProps) => (
  <Card className="w-full gap-4 p-4 sm:p-5">
    <div className="grid gap-3 lg:grid-cols-[minmax(150px,0.7fr)_minmax(0,1.3fr)]">
      <div className="bg-card-secondary flex flex-row items-center justify-between gap-3 rounded-lg p-4">
        <Text as="p" className="text-neutral">
          Aproveitamento
        </Text>
        <Text as="span" className="text-primary! text-3xl! font-bold!">
          {Math.round((correct / total) * 100)}%
        </Text>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <ResultCount
          label="Corretas"
          value={correct}
          icon={<MdCheckCircleOutline aria-hidden="true" size={16} />}
          tone="success"
        />
        <ResultCount
          label="Erradas"
          value={wrong}
          icon={<IoMdCloseCircleOutline aria-hidden="true" size={16} />}
          tone="error"
        />
        <ResultCount
          label="Em branco"
          value={blank}
          icon={<MdOutlineRemoveCircleOutline aria-hidden="true" size={16} />}
          tone="neutral"
        />
      </div>
    </div>
    <ProgressBar
      label="Respostas corretas"
      value={correct}
      max={total}
      info={`${correct} de ${total}`}
    />
  </Card>
);

const resultTones = {
  success: {
    background: "bg-success-bg",
    foreground: "text-success!",
  },
  error: {
    background: "bg-error-bg",
    foreground: "text-error!",
  },
  neutral: {
    background: "bg-card-secondary",
    foreground: "text-neutral!",
  },
};

const ResultCount = ({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone: keyof typeof resultTones;
}) => (
  <div
    className={`flex min-w-0 flex-col items-center justify-between gap-2 rounded-lg px-2 py-3 text-center sm:p-3 lg:items-start lg:text-left ${resultTones[tone].background}`}
  >
    <div
      className={`flex flex-row items-center gap-1 text-center text-xs font-medium lg:text-left lg:text-sm ${resultTones[tone].foreground}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="leading-tight">{label}</span>
    </div>
    <Text as="h4" className={resultTones[tone].foreground}>
      {value}
    </Text>
  </div>
);

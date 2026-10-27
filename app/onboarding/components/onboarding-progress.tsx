interface Props {
  current: number;
  total: number;
}

export const OnboardingProgress = ({ current, total }: Props) => (
  <div
    role="progressbar"
    aria-label="Progresso da configuração"
    aria-valuemin={1}
    aria-valuemax={total}
    aria-valuenow={current}
    className="h-2 w-full overflow-hidden rounded-full bg-black/10"
  >
    <div
      className="bg-primary h-2 rounded-full transition-[width] duration-500 motion-reduce:transition-none"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

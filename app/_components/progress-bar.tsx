import { Text } from "@/app/_components/text";

interface Props {
    label: string;
    info?: string;
    value: number;
    max: number;
}

export const ProgressBar = ({label, value, max, info}: Props) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-sm">
      <Text>{label}</Text>
      <Text>{info ?? `${value}/${max}`}</Text>
    </div>
    <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
      <div
        className="h-2 rounded-full bg-primary"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

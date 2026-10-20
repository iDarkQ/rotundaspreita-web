import { Text } from "@/app/_components/text";
import { Tooltip } from "@/app/_components/tooltip";

interface Props {
  label: string;
  hint?: string;
  info?: string;
  value: number;
  max: number;
}

export const ProgressBar = ({ label, hint, value, max, info }: Props) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-sm">
      <Text>
        {hint ? (
          <Tooltip align="start" content={hint}>
            {label}
          </Tooltip>
        ) : (
          label
        )}
      </Text>
      <Text>{info ?? `${value}/${max}`}</Text>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
      <div
        className="bg-primary h-2 rounded-full"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

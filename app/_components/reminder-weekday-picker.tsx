import { Button } from "@/app/_components/button";
import clsx from "clsx";

export const WEEKDAYS = [
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
  { value: 0, label: "Dom" },
];

interface Props {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
}

export const ReminderWeekdayPicker = ({ label, value, onChange }: Props) => (
  <div role="group" aria-label={label} className="flex flex-wrap gap-2">
    {WEEKDAYS.map(({ value: day, label: dayLabel }) => {
      const selected = value.includes(day);

      return (
        <Button
          key={day}
          type="button"
          variant="outlined"
          aria-pressed={selected}
          onClick={() =>
            onChange(
              selected ? value.filter((item) => item !== day) : [...value, day],
            )
          }
          className={clsx("min-w-14", selected && "bg-primary! text-white!")}
        >
          {dayLabel}
        </Button>
      );
    })}
  </div>
);

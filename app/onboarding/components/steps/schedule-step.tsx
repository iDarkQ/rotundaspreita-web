import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { ReminderWeekdayPicker } from "@/app/_components/reminder-weekday-picker";
import { Text } from "@/app/_components/text";
import { OnboardingStep } from "@/app/onboarding/components/onboarding-step";

interface Props {
  direction: "forward" | "backward";
  weekdays: number[];
  time: string;
  timezone: string;
  onWeekdaysChange: (value: number[]) => void;
  onTimeChange: (value: string) => void;
}

export const ScheduleStep = ({
  direction,
  weekdays,
  time,
  timezone,
  onWeekdaysChange,
  onTimeChange,
}: Props) => (
  <OnboardingStep
    direction={direction}
    title="Quando devemos lembrá-lo?"
    description="Escolha os dias e a hora em que prefere praticar."
  >
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Text>Dias da semana</Text>
        <ReminderWeekdayPicker
          label="Dias dos lembretes"
          value={weekdays}
          onChange={onWeekdaysChange}
        />
      </div>
      <Field className="gap-2">
        <Text as="label" htmlFor="onboarding-reminder-time">
          Hora do lembrete
        </Text>
        <Input
          id="onboarding-reminder-time"
          type="time"
          value={time}
          onChange={(event) => onTimeChange(event.target.value)}
          required
        />
        <Text className="text-sm opacity-70">Hora local ({timezone})</Text>
      </Field>
    </div>
  </OnboardingStep>
);

"use client";

import { Button } from "@/app/_components/button";
import { Checkbox } from "@/app/_components/checkbox";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { ReminderWeekdayPicker } from "@/app/_components/reminder-weekday-picker";
import { Text } from "@/app/_components/text";
import { useBrowserTimezone } from "@/app/_hooks/use-browser-timezone";
import { useSaveReminderPreferences } from "@/app/_hooks/use-save-reminder-preferences";
import { FormEvent, useState } from "react";

interface Props {
  initialPreferences: {
    examDate: string | null;
    weeklyTestGoal: number | null;
    reminderWeekdays: number[];
    reminderTime: string | null;
    reminderTimezone: string | null;
    pushNotificationsEnabled: boolean;
  };
}

export const ReminderSettingsForm = ({ initialPreferences }: Props) => {
  const { save, loading } = useSaveReminderPreferences(
    initialPreferences.pushNotificationsEnabled,
  );
  const [examDate, setExamDate] = useState(initialPreferences.examDate ?? "");
  const [weeklyTestGoal, setWeeklyTestGoal] = useState(
    String(initialPreferences.weeklyTestGoal ?? 3),
  );
  const [reminderWeekdays, setReminderWeekdays] = useState(
    initialPreferences.reminderWeekdays.length
      ? initialPreferences.reminderWeekdays
      : [1, 3, 5],
  );
  const [reminderTime, setReminderTime] = useState(
    initialPreferences.reminderTime ?? "18:00",
  );
  const reminderTimezone = useBrowserTimezone(
    initialPreferences.reminderTimezone,
  );
  const [pushEnabled, setPushEnabled] = useState(
    initialPreferences.pushNotificationsEnabled,
  );
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus(null);

    const weeklyGoal = Number(weeklyTestGoal);
    if (!Number.isInteger(weeklyGoal) || weeklyGoal < 1 || weeklyGoal > 100) {
      setError("O objetivo semanal deve estar entre 1 e 100 testes.");
      return;
    }
    if (!reminderWeekdays.length) {
      setError("Selecione pelo menos um dia para receber os lembretes.");
      return;
    }

    const result = await save(
      {
        examDate: examDate || null,
        weeklyTestGoal: weeklyGoal,
        reminderWeekdays,
        reminderTime,
        reminderTimezone,
      },
      pushEnabled,
    );

    if (!result.saved) {
      setError(result.error);
      return;
    }

    setStatus("As preferências foram guardadas.");
    if (result.pushError) {
      setError(
        `As preferências foram guardadas, mas as notificações push não ficaram ativas. ${result.pushError}`,
      );
      setPushEnabled(false);
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-7">
      <div className="flex flex-col gap-2">
        <Text as="h1" className="text-3xl font-extrabold">
          Notificações e lembretes
        </Text>
        <Text className="opacity-80">
          Ajuste o seu objetivo semanal, os lembretes e as notificações push.
        </Text>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Field className="gap-2">
          <Text as="label" htmlFor="exam-date">
            Quando é o seu exame? <span className="opacity-60">(opcional)</span>
          </Text>
          <Input
            id="exam-date"
            type="date"
            value={examDate}
            onChange={(event) => setExamDate(event.target.value)}
          />
        </Field>

        <Field className="gap-2">
          <Text as="label" htmlFor="weekly-test-goal">
            Quantos testes quer fazer por semana?
          </Text>
          <Input
            id="weekly-test-goal"
            type="number"
            min={1}
            max={100}
            value={weeklyTestGoal}
            onChange={(event) => setWeeklyTestGoal(event.target.value)}
            required
          />
        </Field>

        <div className="flex flex-col gap-2">
          <Text>Em que dias quer receber lembretes?</Text>
          <ReminderWeekdayPicker
            label="Dias dos lembretes"
            value={reminderWeekdays}
            onChange={setReminderWeekdays}
          />
        </div>

        <Field className="gap-2">
          <Text as="label" htmlFor="reminder-time">
            A que horas?
          </Text>
          <Input
            id="reminder-time"
            type="time"
            value={reminderTime}
            onChange={(event) => setReminderTime(event.target.value)}
            required
          />
          <Text className="text-sm opacity-70">
            Hora local ({reminderTimezone})
          </Text>
        </Field>

        <Field className="flex-row items-start gap-3">
          <Checkbox
            checked={pushEnabled}
            onChange={setPushEnabled}
            aria-label="Ativar notificações push"
          />
          <Text as="label" className="flex-1">
            Quero receber lembretes por notificações push neste navegador. Esta
            autorização é opcional e pode ser alterada mais tarde.
          </Text>
        </Field>

        {status && (
          <div role="status">
            <Text as="p">{status}</Text>
          </div>
        )}
        {error && (
          <div role="alert">
            <Text as="p" className="text-error!">
              {error}
            </Text>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button type="submit" loading={loading}>
            <Text as="span" className="text-white">
              Guardar alterações
            </Text>
          </Button>
          <Text className="text-sm opacity-70">
            Ao desativar, os lembretes push deixam de ser enviados para todos os
            dispositivos associados à conta.
          </Text>
        </div>
      </form>
    </div>
  );
};

"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { useBrowserTimezone } from "@/app/_hooks/use-browser-timezone";
import { useImagesLoaded } from "@/app/_hooks/use-images-loaded";
import { useSaveReminderPreferences } from "@/app/_hooks/use-save-reminder-preferences";
import { deferOnboarding } from "@/app/_services/reminder-service";
import { RouteNames } from "@/app/_utils/route-names";
import { OnboardingProgress } from "@/app/onboarding/components/onboarding-progress";
import { OnboardingStep } from "@/app/onboarding/components/onboarding-step";
import { DoneStep } from "@/app/onboarding/components/steps/done-step";
import { ExamStep } from "@/app/onboarding/components/steps/exam-step";
import { GoalStep } from "@/app/onboarding/components/steps/goal-step";
import { PushStep } from "@/app/onboarding/components/steps/push-step";
import { ScheduleStep } from "@/app/onboarding/components/steps/schedule-step";
import {
  INTRO_SCENE_ASSETS,
  IntroPhase,
  IntroRoadScene,
} from "@/app/onboarding/components/intro-road-scene";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MdArrowBack } from "react-icons/md";

type Step = "welcome" | "exam" | "goal" | "push" | "schedule" | "done";

const STEP_ORDER: Step[] = ["welcome", "exam", "goal", "push", "schedule"];

interface Props {
  firstName: string;
  initialPreferences: {
    examDate: string | null;
    weeklyTestGoal: number | null;
    reminderWeekdays: number[];
    reminderTime: string | null;
    reminderTimezone: string | null;
    pushNotificationsEnabled: boolean;
  };
}

export const OnboardingWizard = ({ firstName, initialPreferences }: Props) => {
  const router = useRouter();
  const { save, loading: saving } = useSaveReminderPreferences(
    initialPreferences.pushNotificationsEnabled,
  );
  const [step, setStep] = useState<Step>("welcome");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [examDate, setExamDate] = useState(initialPreferences.examDate ?? "");
  const [examUnknown, setExamUnknown] = useState(false);
  const [weeklyGoal, setWeeklyGoal] = useState(
    initialPreferences.weeklyTestGoal ?? 3,
  );
  const [pushChoice, setPushChoice] = useState<boolean | null>(null);
  const [weekdays, setWeekdays] = useState(
    initialPreferences.reminderWeekdays.length
      ? initialPreferences.reminderWeekdays
      : [1, 3, 5],
  );
  const [time, setTime] = useState(initialPreferences.reminderTime ?? "18:00");
  const timezone = useBrowserTimezone(initialPreferences.reminderTimezone);
  const [pushError, setPushError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const introAssetsLoaded = useImagesLoaded(INTRO_SCENE_ASSETS);
  const [introPlayed, setIntroPlayed] = useState(false);
  const introPhase: IntroPhase = introPlayed
    ? "done"
    : introAssetsLoaded
      ? "playing"
      : "loading";
  const introRevealClass =
    introPhase === "playing"
      ? "motion-safe:animate-onboarding-fields"
      : introPhase === "loading"
        ? "invisible"
        : "";

  const goTo = (next: Step, nextDirection: "forward" | "backward") => {
    setError(null);
    setDirection(nextDirection);
    setStep(next);
  };

  const goBack = () => {
    const index = STEP_ORDER.indexOf(step);
    if (index > 0) goTo(STEP_ORDER[index - 1], "backward");
  };

  const finish = async () => {
    const remindersWanted = pushChoice === true;
    const result = await save(
      {
        examDate: examUnknown ? null : examDate || null,
        weeklyTestGoal: weeklyGoal,
        reminderWeekdays: weekdays,
        reminderTime: time,
        reminderTimezone: timezone,
      },
      remindersWanted,
    );

    if (!result.saved) {
      setError(result.error);
      return;
    }

    setPushError(result.pushError);
    goTo("done", "forward");
  };

  const goNext = async () => {
    setError(null);

    switch (step) {
      case "welcome":
        return goTo("exam", "forward");
      case "exam":
        if (!examUnknown && !examDate) {
          setError(
            "Indique a data do exame ou escolha “Ainda não sei a data”.",
          );
          return;
        }
        if (!examUnknown && examDate < dayjs().format("YYYY-MM-DD")) {
          setError("A data do exame não pode estar no passado.");
          return;
        }
        return goTo("goal", "forward");
      case "goal":
        return goTo("push", "forward");
      case "push":
        if (pushChoice === null) {
          setError("Escolha uma opção para continuar.");
          return;
        }
        return pushChoice ? goTo("schedule", "forward") : finish();
      case "schedule":
        if (!weekdays.length) {
          setError("Selecione pelo menos um dia para receber os lembretes.");
          return;
        }
        if (!time) {
          setError("Selecione uma hora para os lembretes.");
          return;
        }
        return finish();
      case "done":
        router.replace(RouteNames.PANEL);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    await goNext();
  };

  const handleDefer = async () => {
    try {
      await deferOnboarding();
      router.replace(RouteNames.PANEL);
    } catch {
      setError("Não foi possível guardar. Tente novamente.");
    }
  };

  const primaryLabel = {
    welcome: "Começar",
    exam: "Continuar",
    goal: "Continuar",
    push: pushChoice === false ? "Concluir" : "Continuar",
    schedule: "Ativar lembretes e concluir",
    done: "Ir para o painel",
  }[step];

  const progressCurrent =
    step === "done" ? STEP_ORDER.length : STEP_ORDER.indexOf(step) + 1;

  return (
    <div className="mx-auto flex min-h-full w-full max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button
            variant="text"
            onClick={goBack}
            disabled={saving}
            className={step === "welcome" || step === "done" ? "invisible" : ""}
            aria-label="Voltar ao passo anterior"
          >
            <span className="flex items-center gap-1">
              <MdArrowBack aria-hidden="true" className="text-primary" />
              <Text as="span" className="text-primary!">
                Voltar
              </Text>
            </span>
          </Button>
          <Button
            variant="text"
            onClick={handleDefer}
            disabled={saving}
            className={step === "done" ? "invisible" : ""}
          >
            <Text as="span" className="text-primary!">
              Fazer mais tarde
            </Text>
          </Button>
        </div>
        <OnboardingProgress
          current={progressCurrent}
          total={STEP_ORDER.length}
        />
      </div>

      <form
        className="flex flex-1 flex-col justify-center gap-8 pb-6"
        onSubmit={handleSubmit}
        noValidate
      >
        {step === "welcome" && (
          <div className="flex w-full flex-col gap-8">
            <IntroRoadScene phase={introPhase} />
            <div
              className={introRevealClass}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) setIntroPlayed(true);
              }}
            >
              <OnboardingStep
                direction={direction}
                title={`Olá, ${firstName}!`}
                description="Vamos preparar o seu plano de estudo em menos de um minuto. São só alguns passos rápidos e pode alterar tudo mais tarde."
              />
            </div>
          </div>
        )}
        {step === "exam" && (
          <ExamStep
            direction={direction}
            examDate={examDate}
            examUnknown={examUnknown}
            onExamDateChange={(value) => {
              setExamDate(value);
              if (value) setExamUnknown(false);
            }}
            onExamUnknownChange={(value) => {
              setExamUnknown(value);
              if (value) setExamDate("");
            }}
          />
        )}
        {step === "goal" && (
          <GoalStep
            direction={direction}
            value={weeklyGoal}
            onChange={setWeeklyGoal}
          />
        )}
        {step === "push" && (
          <PushStep
            direction={direction}
            value={pushChoice}
            onChange={(value) => {
              setPushChoice(value);
              setError(null);
            }}
          />
        )}
        {step === "schedule" && (
          <ScheduleStep
            direction={direction}
            weekdays={weekdays}
            time={time}
            timezone={timezone}
            onWeekdaysChange={setWeekdays}
            onTimeChange={setTime}
          />
        )}
        {step === "done" && (
          <DoneStep
            direction={direction}
            examDate={examUnknown ? null : examDate || null}
            weeklyGoal={weeklyGoal}
            remindersActive={pushChoice === true && !pushError}
            weekdays={weekdays}
            time={time}
            pushError={pushError}
          />
        )}

        {error && (
          <div role="alert">
            <Text as="p" className="text-error!">
              {error}
            </Text>
          </div>
        )}

        <Button
          type="submit"
          loading={saving}
          className={step === "welcome" ? introRevealClass : ""}
        >
          <Text as="span" className="text-white">
            {primaryLabel}
          </Text>
        </Button>
      </form>
    </div>
  );
};

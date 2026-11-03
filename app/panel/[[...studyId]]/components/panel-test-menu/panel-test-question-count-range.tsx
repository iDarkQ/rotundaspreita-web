"use client";

import { Text } from "@/app/_components/text";
import {
  RECOMMENDED_TEST_QUESTION_COUNT,
  TEST_QUESTION_COUNT_OPTIONS,
  TestQuestionCount,
} from "@/app/_utils/test-question-count";
import { CSSProperties } from "react";
import clsx from "clsx";
import { MdStar } from "react-icons/md";

interface Props {
  value: TestQuestionCount;
  onChange: (value: TestQuestionCount) => void;
}

const lastStopIndex = TEST_QUESTION_COUNT_OPTIONS.length - 1;

export const PanelTestQuestionCountRange = ({ value, onChange }: Props) => {
  const selectedIndex = TEST_QUESTION_COUNT_OPTIONS.indexOf(value);
  const progress = (selectedIndex / lastStopIndex) * 100;

  return (
    <div className="flex flex-col gap-1">
      <div
        className="relative mx-2 h-8"
        data-testid="test-question-count-slider"
        style={{ "--slider-progress": `${progress}%` } as CSSProperties}
      >
        <div className="bg-primary/30 absolute top-[15px] right-0 left-0 h-1 rounded-full" />
        {TEST_QUESTION_COUNT_OPTIONS.map((option, index) => (
          <div
            key={option}
            data-testid="test-question-count-tick"
            className={clsx(
              "absolute top-[11px] h-3 w-0.5 -translate-x-1/2 rounded-full transition-colors",
              option === value ? "bg-primary" : "bg-primary/30",
            )}
            style={{ left: `${(index / lastStopIndex) * 100}%` }}
          />
        ))}
        <div
          data-testid="test-question-count-thumb"
          className="bg-primary absolute top-2 size-4 -translate-x-1/2 rounded-full transition-[left] duration-200 ease-out motion-reduce:transition-none"
          style={{ left: "var(--slider-progress)" }}
        />
        <input
          type="range"
          min={0}
          max={lastStopIndex}
          step={1}
          value={selectedIndex}
          onChange={(event) =>
            onChange(
              TEST_QUESTION_COUNT_OPTIONS[Number(event.currentTarget.value)],
            )
          }
          aria-label="Número de perguntas"
          aria-valuetext={`${value} perguntas, ${value} minutos`}
          className="focus-visible:outline-primary absolute -top-1 -left-2 z-10 h-10 w-[calc(100%+1rem)] cursor-pointer appearance-none rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
        />
      </div>

      <div
        aria-hidden="true"
        className="flex justify-between px-2"
        data-testid="test-question-count-stops"
      >
        {TEST_QUESTION_COUNT_OPTIONS.map((option) => (
          <span
            key={option}
            data-testid={`test-question-count-stop-${option}`}
            className={clsx(
              "font-roboto paragraph text-neutral relative w-0 text-center text-sm",
              option === value && "text-primary font-bold",
            )}
          >
            <span className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap">
              {option === RECOMMENDED_TEST_QUESTION_COUNT && (
                <MdStar size={14} className="text-secondary" />
              )}
              {option}
            </span>
          </span>
        ))}
      </div>

      <Text className="sr-only">
        Passos disponíveis: {TEST_QUESTION_COUNT_OPTIONS.join(", ")} perguntas.
      </Text>
    </div>
  );
};

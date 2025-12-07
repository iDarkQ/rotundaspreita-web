"use client";

import { Banner } from "@/app/_components/banner";
import { Text } from "@/app/_components/text";
import { posthogClient } from "@/app/_lib/instrumentation-client";
import { Difficulty } from "@/app/_types/difficulty";
import { TestResultsTestimonial } from "@/app/test/components/test-results-testimonial";
import { useTestManager } from "@/app/test/providers/test-manager";
import clsx from "clsx";
import { useEffect } from "react";
import { MdOutlineThumbDownAlt } from "react-icons/md";
import { MdOutlineThumbUp } from "react-icons/md";

interface Props {
  studyTitle?: string;
  category?: string;
  difficulty?: Difficulty;
}

export const TestResults = ({ studyTitle, category, difficulty }: Props) => {
  const { finished, answers, correctAnswers } = useTestManager();

  let countCorrectAnswers = 0;
  let countAllAnswers = 0;
  let percentage = 0;

  if (finished && answers && correctAnswers) {
    countCorrectAnswers = Object.entries(answers).reduce(
      (acc, [questionId, answerId]) => {
        if (correctAnswers[questionId] === answerId) {
          return acc + 1;
        }
        return acc;
      },
      0,
    );

    countAllAnswers = Object.keys(correctAnswers).length;

    percentage =
      (countCorrectAnswers / Object.keys(correctAnswers).length) * 100;
  }

  useEffect(() => {
    if (finished && answers && correctAnswers) {
      posthogClient.capture("finish_test", {
        study: studyTitle,
        category: category,
        difficulty: difficulty,
        correctAnswers: countCorrectAnswers,
        wrongAnswers: countAllAnswers - countCorrectAnswers,
        percentage,
      });
    }
  }, [
    finished,
    answers,
    correctAnswers,
    countCorrectAnswers,
    countAllAnswers,
    percentage,
    studyTitle,
    category,
    difficulty,
  ]);

  if (!finished || !answers || !correctAnswers) return null;

  return (
    <>
      <TestResultsTestimonial finished={finished} percentage={percentage}/>
      <Banner
        className={clsx(
          "flex w-full items-center justify-between gap-2",
          percentage > 75 ? "border-success!" : "border-error!",
        )}
      >
        <Text
          as="h2"
          className={percentage > 75 ? "text-success!" : "text-error!"}
        >
          {countCorrectAnswers}/{countAllAnswers}
        </Text>
        {percentage > 75 ? (
          <MdOutlineThumbUp size={50} className="text-success!" />
        ) : (
          <MdOutlineThumbDownAlt size={50} className="text-error!" />
        )}
      </Banner>
    </>
  );
};

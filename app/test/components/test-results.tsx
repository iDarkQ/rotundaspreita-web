"use client";

import { Banner } from "@/app/_components/banner";
import { Text } from "@/app/_components/text";
import { useTestManager } from "@/app/test/providers/test-manager";
import clsx from "clsx";
import { MdOutlineThumbDownAlt } from "react-icons/md";
import { MdOutlineThumbUp } from "react-icons/md";

export const TestResults = () => {
  const { finished, answers, correctAnswers } = useTestManager();

  if (!finished || !answers || !correctAnswers) return;

  const countCorrectAnswers = Object.entries(answers).reduce(
    (acc, [questionId, answerId]) => {
      if (correctAnswers[questionId] === answerId) {
        return acc + 1;
      }
      return acc;
    },
    0,
  );

  const percentage =
    (countCorrectAnswers / Object.keys(correctAnswers).length) * 100;

  return (
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
        {countCorrectAnswers}/{Object.keys(correctAnswers).length}
      </Text>
      {percentage > 75 ? (
        <MdOutlineThumbUp size={50} className="text-success!" />
      ) : (
        <MdOutlineThumbDownAlt size={50} className="text-error!" />
      )}
    </Banner>
  );
};

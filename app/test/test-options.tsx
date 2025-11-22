"use client";

import { AnswerOption } from "@/app/_components/answer-option";
import { Divider } from "@/app/_components/divider";
import { QuestionsPagination } from "@/app/_components/questions-pagination";
import { Text } from "@/app/_components/text";
import { useTestManager } from "@/app/test/providers/test-manager";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

export const TestOptions = () => {
  const {
    answers,
    setAnswers,
    questions,
    finished,
    correctAnswers,
    selectedPage,
    setSelectedPage,
  } = useTestManager();

  const question = questions.find((q) => q.id === selectedPage);

  const currentIndex = questions.findIndex((q) => q.id === selectedPage);
  const currentPage = currentIndex === -1 ? 0 : currentIndex + 1;

  return (
    <>
      <div className="flex flex-col w-full min-h-[50vh] gap-8 items-center">
        <Text as="h3">{question?.content}</Text>
        <Divider orientation="horizontal" />
        <div className="flex flex-col w-full gap-2">
          <RadioGroup className="flex flex-col gap-2">
            {question?.options.map((option) => {
              const userAnswer = answers[selectedPage]; // what the user selected (might be undefined)
              const correctAnswerId = correctAnswers[selectedPage]; // the correct option id

              console.log({ userAnswer, correctAnswerId });
              let state: "correct" | "wrong" | undefined = undefined;

              if (finished) {
                if (userAnswer === option.id) {
                  state = userAnswer === correctAnswerId ? "correct" : "wrong";
                }

                if (option.id === correctAnswerId) {
                  state = "correct";
                }
              }

              return (
                <AnswerOption
                  key={option.id}
                  option={option.letter}
                  label={option.content}
                  selected={
                    !finished
                      ? answers[selectedPage]
                        ? answers[selectedPage] === option.id
                        : false
                      : undefined
                  }
                  selectable={!finished}
                  state={state}
                  onClick={() => {
                    if (finished) return;
                    if (
                      currentPage < questions.length &&
                      !answers[selectedPage]
                    ) {
                      setTimeout(() => {
                        const nextQuestionId = questions[currentIndex + 1];
                        setSelectedPage(nextQuestionId.id);
                      }, 500);
                    }

                    setAnswers((prev) => ({
                      ...prev,
                      [selectedPage]: option.id,
                    }));
                  }}
                />
              );
            })}
          </RadioGroup>
        </div>
      </div>
      <QuestionsPagination
        count={questions.length}
        page={currentPage}
        onChange={(index) => {
          setSelectedPage(questions[index - 1]?.id);
        }}
      />
    </>
  );
};

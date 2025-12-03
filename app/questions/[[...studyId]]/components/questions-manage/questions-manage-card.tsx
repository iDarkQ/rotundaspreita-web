"use client";

import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import { useRipple } from "@/app/_hooks/use-ripple";
import { User } from "@/app/generated/prisma/browser";
import { QuestionManagerDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-manager-dialog";
import { QuestionViewerDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-viewer-dialog";
import { QuestionWithOptions } from "@/app/_types/question-with-options";
import { RefObject, useState } from "react";

interface Props {
  question: QuestionWithOptions;
  answeredCount?: number;
  user: User;
}

export const QuestionsCard = ({ question, user, answeredCount = 0 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useRipple();

  return (
    <>
      <Card
        ref={ref as RefObject<HTMLDivElement | null>}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="c-border relative flex cursor-pointer flex-col gap-2 overflow-hidden"
      >
        {answeredCount > 0 && (
          <div className="bg-primary absolute top-0 left-0 flex h-5 w-full items-center justify-center">
            <Text as="p" className="text-white!">
              Já respondeu{" "}
              {`${answeredCount} ${answeredCount > 1 ? "vezes" : "vez"}`}
            </Text>
          </div>
        )}

        <div className="flex flex-col p-5">
          <Text as="h4" className="text-primary! font-bold">
            {question.content}
          </Text>
        </div>
      </Card>
      {isOpen &&
        (user.admin ? (
          <QuestionManagerDialog
            question={question}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        ) : (
          <QuestionViewerDialog
            onClose={() => setIsOpen(false)}
            question={question}
          />
        ))}
    </>
  );
};

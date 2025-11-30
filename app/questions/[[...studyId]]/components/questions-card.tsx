"use client";

import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import { useRipple } from "@/app/_hooks/use-ripple";
import { User } from "@/app/generated/prisma/browser";
import { QuestionCreatorDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-creator-dialog";
import { QuestionViewerDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-viewer-dialog";
import { QuestionWithOptions } from "@/types/question-with-options";
import { RefObject, useState } from "react";

interface Props {
  selectedStudy: string;
  question: QuestionWithOptions;
  answeredCount?: number;
  categories: string[];
  user: User;
}

export const QuestionsCard = ({
  question,
  selectedStudy,
  categories,
  user,
  answeredCount = 0,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { events, cancel, ref } = useRipple();

  return (
    <>
      <Card
        ref={ref as RefObject<HTMLDivElement | null>}
        onMouseLeave={cancel}
        onPointerDown={events}
        onPointerUp={events}
        onClick={(e) => {
          events(e);
          setIsOpen((prev) => !prev);
        }}
        className="cursor-pointer relative c-border flex flex-col gap-2 overflow-hidden"
      >
        {answeredCount > 0 && (
          <div className="absolute top-0 left-0 w-full h-5 bg-primary flex items-center justify-center">
            <Text as="p" className="text-white!">
              Já respondeu{" "}
              {`${answeredCount} ${answeredCount > 1 ? "vezes" : "vez"}`}
            </Text>
          </div>
        )}

        <div className="flex flex-col p-5">
          <Text as="h4" className="font-bold text-primary!">{question.content}</Text>
        </div>
      </Card>
      {isOpen &&
        (user.admin ? (
          <QuestionCreatorDialog
            categories={categories}
            selectedStudy={selectedStudy}
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

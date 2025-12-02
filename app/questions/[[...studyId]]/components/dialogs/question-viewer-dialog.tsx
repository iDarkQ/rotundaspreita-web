"use client";

import { AnswerOption } from "@/app/_components/answer-option";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { OptionLetter } from "@/app/generated/prisma/browser";
import { QuestionWithOptions } from "@/app/_types/question-with-options";
import { RadioGroup } from "@headlessui/react";
import { useCallback } from "react";

interface Props {
  onClose: () => void;
  question?: QuestionWithOptions;
}

export const QuestionViewerDialog = ({
  onClose,
  question: baseQuestion,
}: Props) => {
  const { options: baseOptions } = baseQuestion ?? {};

  const optionLetter = useCallback(
    (index: number) => String.fromCharCode(65 + index) as OptionLetter,
    []
  );

  return (
    <Dialog onClose={onClose} title={baseQuestion?.content}>
      <DialogPart>
        <RadioGroup className="flex flex-col gap-2">
          {(baseOptions ?? []).map((opt, idx) => (
            <AnswerOption
              key={opt.id}
              option={optionLetter(idx)}
              label={opt.content}
              selected={opt.answer}
              defaultValue={opt.content}
              selectable={false}
            />
          ))}
        </RadioGroup>
      </DialogPart>
    </Dialog>
  );
};

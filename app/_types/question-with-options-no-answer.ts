import { OptionNoAnswer } from "@/app/_types/option-no-answer";
import { Question } from "@/app/generated/prisma/browser";

export type QuestionWithOptionsNoAnswer = Question & {
  options: OptionNoAnswer[];
};

import { Option, Question } from "@/app/generated/prisma/browser";

export type QuestionWithOptionsNoAnswer = Question & {
  options: Omit<Option, "answer">[];
};

import { Option, Question } from "@/app/generated/prisma/browser";

export type QuestionWithOptions = Question & {
  options: Option[];
};

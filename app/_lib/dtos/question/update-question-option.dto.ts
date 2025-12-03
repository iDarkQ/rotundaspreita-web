import { OptionLetter } from "@/app/generated/prisma/enums";

export interface UpdateQuestionDto {
  id: string;
  letter: OptionLetter;
  content: string;
  category?: string;
  answer: boolean;
}

import { QuestionWithOptions } from "@/app/_types/question-with-options";

export interface SearchResults {
  maxPages: number;
  questions: QuestionWithOptions[];
}

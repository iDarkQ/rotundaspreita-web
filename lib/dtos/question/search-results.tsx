import { QuestionWithOptions } from "@/types/question-with-options";

export interface SearchResults {
    maxPages: number;
    questions: QuestionWithOptions[];
}
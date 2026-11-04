import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";

export interface StartedTest {
  token: string;
  studyId: string;
  questionIds: string[];
  firstQuestion: QuestionWithOptionsNoAnswer;
}

export type TestQuestionFailure =
  | "no-access"
  | "invalid-run"
  | "not-issued"
  | "limited"
  | "not-found";

export interface FetchedTestQuestion {
  question?: QuestionWithOptionsNoAnswer;
  failure?: TestQuestionFailure;
}

export type ReadinessBand = "not-ready" | "on-track" | "almost" | "ready";

export interface CategoryProgressDto {
  category: string;
  total: number;
  seen: number;
  answers: number;
  accuracy: number;
  strength: number;
  weak: boolean;
}

export type ExamCountdownDto =
  | { status: "none" }
  | { status: "past"; examDate: string }
  | { status: "today"; examDate: string }
  | {
      status: "upcoming";
      examDate: string;
      daysLeft: number;
      weeksLeft: number;
      questionsPerDay: number | null;
    };

export interface ReadinessDto {
  studyId: string;
  unlocked: boolean;
  totalAnswers: number;
  minimumAnswers: number;
  score: number | null;
  band: ReadinessBand | null;
  coverage: number;
  accuracy: number;
  consistency: number;
  weeklyGoal: number;
  testsLastSevenDays: number;
  unseenQuestions: number;
  nextStep: string;
  categories: CategoryProgressDto[];
  examCountdown: ExamCountdownDto;
}

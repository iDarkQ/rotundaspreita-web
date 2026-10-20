import {
  CategoryProgressDto,
  ReadinessBand,
  ReadinessDto,
} from "@/app/_lib/dtos/test-results/readiness.dto";
import { computeExamCountdown } from "@/app/_utils/exam-countdown";

export const MINIMUM_ANSWERS = 30;
export const RECENT_ANSWERS_WINDOW = 50;
export const CONSISTENCY_WEEKS = 4;
export const DEFAULT_WEEKLY_GOAL = 3;
export const WEAK_AREA_THRESHOLD = 70;
export const MAX_WEAK_AREAS = 3;
export const MIN_CATEGORY_EVIDENCE = 3;
export const URGENT_DAYS_LEFT = 14;

const WEIGHTS = { coverage: 0.4, accuracy: 0.4, consistency: 0.2 };
const DAY_MS = 24 * 60 * 60 * 1000;

export interface AnswerRecord {
  questionId: string;
  testRunId: string;
  createdAt: Date;
  correct: boolean;
  category: string | null;
}

export interface CategoryQuestionCount {
  category: string;
  total: number;
}

interface BuildReadinessInput {
  studyId: string;
  answers: AnswerRecord[];
  totalQuestions: number;
  categoryCounts: CategoryQuestionCount[];
  weeklyGoal: number | null;
  examDate: Date | null;
  timezone: string | null;
  now: Date;
}

const percentage = (value: number, total: number) =>
  total > 0 ? Math.round((Math.min(value, total) / total) * 100) : 0;

export const getReadinessBand = (score: number): ReadinessBand => {
  if (score >= 85) return "ready";
  if (score >= 70) return "almost";
  if (score >= 40) return "on-track";
  return "not-ready";
};

export const computeCategoryProgress = (
  answers: AnswerRecord[],
  categoryCounts: CategoryQuestionCount[],
): CategoryProgressDto[] => {
  const latestByQuestion = new Map<string, AnswerRecord>();
  const answersByCategory = new Map<string, number>();

  for (const answer of answers) {
    if (!answer.category) continue;

    answersByCategory.set(
      answer.category,
      (answersByCategory.get(answer.category) ?? 0) + 1,
    );

    const current = latestByQuestion.get(answer.questionId);
    if (!current || answer.createdAt > current.createdAt) {
      latestByQuestion.set(answer.questionId, answer);
    }
  }

  const progress = categoryCounts.map(({ category, total }) => {
    const latest = [...latestByQuestion.values()].filter(
      (answer) => answer.category === category,
    );
    const seen = latest.length;
    const accuracy = percentage(
      latest.filter((answer) => answer.correct).length,
      seen,
    );
    const coverage = percentage(seen, total);

    return {
      category,
      total,
      seen,
      answers: answersByCategory.get(category) ?? 0,
      accuracy,
      strength: Math.round(accuracy * 0.5 + coverage * 0.5),
      weak: false,
    };
  });

  return progress.sort((a, b) => a.category.localeCompare(b.category, "pt"));
};

// Categories with enough evidence of weakness come first, then those the
// user has barely explored.
export const pickWeakAreas = (categories: CategoryProgressDto[]) => {
  const candidates = categories.filter(
    (category) => category.strength < WEAK_AREA_THRESHOLD,
  );
  const byStrength = (a: CategoryProgressDto, b: CategoryProgressDto) =>
    a.strength - b.strength;

  return [
    ...candidates
      .filter((category) => category.answers >= MIN_CATEGORY_EVIDENCE)
      .sort(byStrength),
    ...candidates
      .filter((category) => category.answers < MIN_CATEGORY_EVIDENCE)
      .sort(byStrength),
  ]
    .slice(0, MAX_WEAK_AREAS)
    .map((category) => category.category);
};

interface NextStepInput {
  unlocked: boolean;
  totalAnswers: number;
  score: number | null;
  weeklyGoal: number;
  testsLastSevenDays: number;
  weakestArea: string | undefined;
  daysLeft: number | null;
}

export const buildNextStep = ({
  unlocked,
  totalAnswers,
  score,
  weeklyGoal,
  testsLastSevenDays,
  weakestArea,
  daysLeft,
}: NextStepInput) => {
  if (!unlocked) {
    const missing = MINIMUM_ANSWERS - totalAnswers;
    return `Responda a mais ${missing} ${missing === 1 ? "pergunta" : "perguntas"} para desbloquear a sua pontuação.`;
  }

  if (
    weakestArea &&
    daysLeft !== null &&
    daysLeft <= URGENT_DAYS_LEFT &&
    (score ?? 0) < WEAK_AREA_THRESHOLD
  ) {
    return `O exame está próximo. Concentre-se já em ${weakestArea}.`;
  }

  const remainingTests = weeklyGoal - testsLastSevenDays;
  if (remainingTests > 0) {
    return `Faça mais ${remainingTests} ${remainingTests === 1 ? "teste" : "testes"} nos próximos dias para cumprir o objetivo semanal.`;
  }

  if (weakestArea) {
    return `Pratique ${weakestArea} para subir a sua pontuação.`;
  }

  return "Excelente ritmo! Continue a praticar para manter a sua pontuação.";
};

export const buildReadiness = ({
  studyId,
  answers,
  totalQuestions,
  categoryCounts,
  weeklyGoal: savedWeeklyGoal,
  examDate,
  timezone,
  now,
}: BuildReadinessInput): ReadinessDto => {
  const weeklyGoal = savedWeeklyGoal ?? DEFAULT_WEEKLY_GOAL;
  const totalAnswers = answers.length;
  const unlocked = totalAnswers >= MINIMUM_ANSWERS;

  const distinctQuestions = new Set(answers.map((a) => a.questionId)).size;
  const unseenQuestions = Math.max(totalQuestions - distinctQuestions, 0);

  const recentAnswers = [...answers]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, RECENT_ANSWERS_WINDOW);

  const testsSince = (days: number) =>
    new Set(
      answers
        .filter((a) => a.createdAt.getTime() >= now.getTime() - days * DAY_MS)
        .map((a) => a.testRunId),
    ).size;
  const testsLastSevenDays = testsSince(7);

  const coverage = percentage(distinctQuestions, totalQuestions);
  const accuracy = percentage(
    recentAnswers.filter((a) => a.correct).length,
    recentAnswers.length,
  );
  const consistency = percentage(
    testsSince(CONSISTENCY_WEEKS * 7),
    CONSISTENCY_WEEKS * weeklyGoal,
  );

  const score = unlocked
    ? Math.round(
        coverage * WEIGHTS.coverage +
          accuracy * WEIGHTS.accuracy +
          consistency * WEIGHTS.consistency,
      )
    : null;

  const progress = computeCategoryProgress(answers, categoryCounts);
  const weakAreas = unlocked ? pickWeakAreas(progress) : [];
  const categories = progress.map((category) => ({
    ...category,
    weak: weakAreas.includes(category.category),
  }));

  const examCountdown = computeExamCountdown(
    examDate,
    timezone,
    now,
    unseenQuestions,
  );

  return {
    studyId,
    unlocked,
    totalAnswers,
    minimumAnswers: MINIMUM_ANSWERS,
    score,
    band: score === null ? null : getReadinessBand(score),
    coverage,
    accuracy,
    consistency,
    weeklyGoal,
    testsLastSevenDays,
    unseenQuestions,
    nextStep: buildNextStep({
      unlocked,
      totalAnswers,
      score,
      weeklyGoal,
      testsLastSevenDays,
      weakestArea: weakAreas[0],
      daysLeft:
        examCountdown.status === "upcoming" ? examCountdown.daysLeft : null,
    }),
    categories,
    examCountdown,
  };
};

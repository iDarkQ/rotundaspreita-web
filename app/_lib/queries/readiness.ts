import prisma from "@/app/_lib/prisma";
import { AnswerRecord, CategoryQuestionCount } from "@/app/_utils/readiness";

// Intentionally not a "use server" module: these helpers take a user id and
// must only be reachable from server code, never as client-callable actions.
export const fetchStudyAnswerHistory = async (
  userId: string,
  studyId: string,
): Promise<AnswerRecord[]> => {
  const results = await prisma.testResult.findMany({
    where: { userId, studyId },
    select: {
      questionId: true,
      testRunId: true,
      createdAt: true,
      option: { select: { answer: true } },
      question: { select: { category: true } },
    },
  });

  return results.map((result) => ({
    questionId: result.questionId,
    testRunId: result.testRunId,
    createdAt: result.createdAt,
    correct: result.option?.answer === true,
    category: result.question.category,
  }));
};

export const fetchStudyQuestionCounts = async (studyId: string) => {
  const groups = await prisma.question.groupBy({
    by: ["category"],
    where: { studyId },
    _count: { _all: true },
  });

  const categoryCounts: CategoryQuestionCount[] = groups
    .filter((group) => group.category)
    .map((group) => ({
      category: group.category as string,
      total: group._count._all,
    }));

  return {
    totalQuestions: groups.reduce((sum, group) => sum + group._count._all, 0),
    categoryCounts,
  };
};

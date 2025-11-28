"use server";

import { AnalyticsDto } from "@/lib/dtos/test-results/analytics.dto";
import { findManyQuestionsQuery } from "@/lib/queries/question";
import { createTestResultQuery, fetchTestResultsQuery } from "@/lib/queries/test-results";
import { countQuestions } from "@/services/question-service";
import { verifySession } from "@/services/user-service";
import { createId } from "@paralleldrive/cuid2";

export const createTestResults = async (questionId: string, studyId: string, userId: string, optionId: string) => createTestResultQuery({
    question: { connect: { id: questionId } },
    study: { connect: { id: studyId } },
    user: { connect: { id: userId } },
    option: { connect: { id: optionId } },
    testRunId: createId(),
});

export const fetchAnalytics = async (studyId: string): Promise<AnalyticsDto | undefined> => {
    const session = await verifySession();
    if (!session) return;

    const results = await fetchTestResultsQuery({ userId: session.id, studyId });

    const seenQuestions = [...(new Set([...results.map((r) => r.questionId)]))].length;
    const totalQuestionsCount = await countQuestions();

    const testResultIds = results.map((r) => r.questionId);

    const questions = await findManyQuestionsQuery({ id: { in: testResultIds } });

    const correctAnswers = results.reduce<number>((prev, curr) => {
        const selectedOption = questions.find((q) => q.id === curr.questionId)?.options?.find((o) => o.id === curr.optionId);
        return selectedOption?.answer ? prev + 1 : prev;
    }, 0);
    const wrongAnswers = results.length - correctAnswers;

    const averageTestResult = Math.round((correctAnswers / Math.max(results.length, 1)) * 100);;
    const visitedQuestions = Math.round((seenQuestions / Math.max(totalQuestionsCount, 1)) * 100)

    const uniqueFinishedTests = new Set(results.map((r) => r.testRunId));
    const finishedTests = uniqueFinishedTests.size;

    const questionsAnswered = seenQuestions;

    const questionsNotAnswered = totalQuestionsCount - seenQuestions;

    return { finishedTests, averageTestResult, visitedQuestions, correctAnswers, wrongAnswers, questionsAnswered, questionsNotAnswered }
}
"use server";

import { AnalyticsDto } from "@/app/_lib/dtos/test-results/analytics.dto";
import { findManyQuestionsQuery } from "@/app/_lib/queries/question";
import { fetchTestResultsQuery } from "@/app/_lib/queries/test-results";
import { countQuestions } from "@/app/_services/question-service";
import { verifySession } from "@/app/_services/user-service";

export const fetchAnalytics = async (studyId: string): Promise<AnalyticsDto | undefined> => {
    const session = await verifySession();
    if (!session) return;

    const results = await fetchTestResultsQuery({ userId: session.id, studyId });

    const seenQuestions = [...(new Set([...results.map((r) => r.questionId)]))].length;
    const totalQuestionsCount = await countQuestions(studyId);

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


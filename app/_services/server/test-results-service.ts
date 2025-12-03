"use server";

import {
  createTestResultQuery,
  updateManyTestsResultsQuery,
} from "@/app/_lib/queries/test-results";

export const serverMarkAllTestResultsAsNew = async (userId: string) =>
  updateManyTestsResultsQuery({ userId }, { markAsNew: true });

export const serverCreateTestResults = async (
  questionId: string,
  studyId: string,
  userId: string,
  testRunId: string,
  optionId?: string,
) =>
  createTestResultQuery({
    question: { connect: { id: questionId } },
    study: { connect: { id: studyId } },
    user: { connect: { id: userId } },
    option: optionId ? { connect: { id: optionId } } : {},
    testRunId,
  });

"use server";

import {
  findManyQuestionsQuery,
  findRandomQuestions,
} from "@/app/_lib/queries/question";
import {
  createStudyQuery,
  deleteStudyQuery,
  fetchFirstStudyQuery,
  fetchStudiesQuery,
  fetchStudyWithQuestionsQuery,
  updateStudyQuery,
} from "@/app/_lib/queries/study";
import { serverCreateTestResults } from "@/app/_services/server/test-results-service";
import { serverBeginFreeTest } from "@/app/_services/server/user-service";
import {
  verifySession,
  verifyAdminPermissions,
  verifySessionSubscription,
} from "@/app/_services/user-service";
import { Difficulty } from "@/app/_types/difficulty";
import { TestAnswers } from "@/app/_types/test-answer";
import { createId } from "@paralleldrive/cuid2";

export const fetchStudyByIdOrReturnFirst = async (id: string) => {
  await verifySession();

  let study = await fetchFirstStudyQuery({ id });

  if (!study) {
    study = await fetchFirstStudyQuery();
  }

  return study ?? undefined;
};

export const createStudy = async (title: string) => {
  const session = await verifyAdminPermissions();
  if (!session) return;

  return createStudyQuery({ title });
};

export const updateStudy = async (id: string, title: string) => {
  const session = await verifyAdminPermissions();
  if (!session) return;

  return updateStudyQuery({ id }, { title });
};

export const deleteStudy = async (id: string) => {
  const session = await verifyAdminPermissions();
  if (!session) return;

  return deleteStudyQuery({ id });
};

export const fetchAllStudies = async () => fetchStudiesQuery();

export const fetchStudyById = async (id: string) => {
  const session = await verifySession();
  if (!session) return null;

  return fetchFirstStudyQuery({ id });
};

export const fetchAllStudyCategories = async (studyId: string) => {
  const study = await fetchStudyWithQuestionsQuery({ id: studyId });

  if (!study) return [];

  const categories = new Set(
    ...[study.questions.filter((q) => q.category).map((q) => q.category!)],
  );
  return [...categories];
};

export const generateTest = async (
  studyId?: string,
  difficulty?: Difficulty,
  category?: string,
) => {
  const session = await verifySessionSubscription();
  if (!session) return [];

  const study = await fetchFirstStudyQuery({ id: studyId });
  const finalDifficulty = difficulty ?? Difficulty.all;

  if (!study) {
    return [];
  }

  const categories = await fetchAllStudyCategories(study.id);
  const finalCategory = categories.find((c) => c === category);

  const questions = await findRandomQuestions(
    study.id,
    session.id,
    finalDifficulty,
    finalCategory,
  );

  return questions;
};

export const verifyTestResults = async (
  studyId: string,
  answers: TestAnswers,
) => {
  const session = await verifySessionSubscription();
  if (!session) return;

  const study = await fetchStudyById(studyId);
  if (!study) return;

  const ids = Object.keys(answers);

  if (ids.length > 30) return;

  const questions = await findManyQuestionsQuery({ id: { in: ids }, studyId });

  const correctAnswers = questions.reduce<TestAnswers>((acc, q) => {
    acc[q.id] = q.options.find((o) => o.answer)?.id ?? null;
    return acc;
  }, {});

  const testRunId = createId();

  questions.map(async (question) => {
    const option = question.options.find((o) => o.id === answers[question.id]);

    await serverCreateTestResults(
      question.id,
      question.studyId,
      session.id,
      testRunId,
      option?.id,
    );
  });

  await serverBeginFreeTest(session.id);

  return correctAnswers;
};

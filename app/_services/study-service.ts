"use server";

import {
  findManyQuestionsQuery,
  findQuestionWithoutAnswer,
  findRandomQuestionIds,
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
import { consumeTestQuestionFetch } from "@/app/_lib/test-question-rate-limit";
import { readTestRun, signTestRun } from "@/app/_lib/test-run-token";
import { FetchedTestQuestion, StartedTest } from "@/app/_types/started-test";
import { serverBeginFreeTest } from "@/app/_services/server/user-service";
import {
  verifySession,
  verifyAccess,
  verifyAdminPermissions,
} from "@/app/_services/user-service";
import { Difficulty } from "@/app/_types/difficulty";
import { TestAnswers } from "@/app/_types/test-answer";
import { RouteNames } from "@/app/_utils/route-names";
import { parseTestQuestionCount } from "@/app/_utils/test-question-count";
import { createId } from "@paralleldrive/cuid2";
import { redirect } from "next/navigation";

export const fetchStudyByIdOrReturnFirst = async (id: string) => {
  const allowed = await verifyAdminPermissions();

  if (!allowed) {
    redirect(RouteNames.PANEL);
  }

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
  questionCount?: number,
): Promise<StartedTest | undefined> => {
  const access = await verifyAccess();
  if (!access) return;

  const { session, freeTrial } = access;

  const study = await fetchFirstStudyQuery({ id: studyId });
  if (!study) return;

  const categories = await fetchAllStudyCategories(study.id);
  const finalCategory = categories.find((c) => c === category);

  const questionIds = await findRandomQuestionIds(
    study.id,
    session.id,
    difficulty ?? Difficulty.all,
    finalCategory,
    parseTestQuestionCount(questionCount),
    freeTrial,
  );
  if (questionIds.length === 0) return;

  const firstQuestion = await findQuestionWithoutAnswer(
    questionIds[0],
    study.id,
  );
  if (!firstQuestion) return;

  const token = signTestRun({
    userId: session.id,
    studyId: study.id,
    questionIds,
  });

  return { token, studyId: study.id, questionIds, firstQuestion };
};

export const fetchTestQuestion = async (
  token: string,
  questionId: string,
): Promise<FetchedTestQuestion> => {
  const access = await verifyAccess();
  if (!access) return { failure: "no-access" };

  const run = readTestRun(token, access.session.id);
  if (!run) return { failure: "invalid-run" };
  if (!run.questionIds.includes(questionId)) return { failure: "not-issued" };

  if (!(await consumeTestQuestionFetch(access.session.id))) {
    return { failure: "limited" };
  }

  const question = await findQuestionWithoutAnswer(questionId, run.studyId);

  return question ? { question } : { failure: "not-found" };
};

export const verifyTestResults = async (
  token: string,
  answers: TestAnswers,
) => {
  const access = await verifyAccess();
  if (!access) return;

  const { session } = access;

  const run = readTestRun(token, session.id);
  if (!run) return;

  const study = await fetchStudyById(run.studyId);
  if (!study) return;

  const issuedIds = new Set(run.questionIds);
  const ids = Object.keys(answers).filter((id) => issuedIds.has(id));

  const questions = await findManyQuestionsQuery({
    id: { in: ids },
    studyId: study.id,
  });
  const map = new Map(questions.map((q) => [q.id, q]));
  const orderedQuestions = ids.flatMap((id) => map.get(id) ?? []);

  const correctAnswers = orderedQuestions.reduce<TestAnswers>((acc, q) => {
    acc[q.id] = q.options.find((o) => o.answer)?.id ?? null;
    return acc;
  }, {});

  const testRunId = createId();

  orderedQuestions.map(async (question) => {
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

"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/app/_lib/prisma";
import {
  activeOptionsWhere,
  onlyActiveTestResults,
} from "@/app/_lib/queries/active-filters";
import { serverMarkAllTestResultsAsNew } from "@/app/_services/server/test-results-service";
import { Difficulty } from "@/app/_types/difficulty";
import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { shuffle } from "@/app/_utils/shuffle";

const testLength = Number(process.env.NEXT_PUBLIC_TEST_LENGTH ?? 30);

const activeOptions = { where: activeOptionsWhere };

export const createQuestionQuery = async (data: Prisma.QuestionCreateInput) =>
  prisma.question.create({ data, include: { options: activeOptions } });

export const updateQuestionQuery = async (
  where: Prisma.QuestionWhereUniqueInput,
  data: Prisma.QuestionUpdateInput,
) =>
  prisma.question.update({
    where,
    data,
    include: { options: activeOptions },
  });

export const softDeleteQuestionQuery = async (
  where: Prisma.QuestionWhereUniqueInput,
) => prisma.question.update({ where, data: { deleted: true } });

export const findManyQuestionsQuery = async (
  where: Prisma.QuestionWhereInput,
  take?: number,
  skip?: number,
) =>
  prisma.question.findMany({
    where: { ...where, deleted: false },
    include: { options: activeOptions },
    take,
    skip,
    orderBy: { createdAt: "desc" },
  });

export const findQuestionQuery = async (where: Prisma.QuestionWhereInput) =>
  prisma.question.findFirst({
    where: { ...where, deleted: false },
    include: { options: activeOptions },
  });

export const countQuestionsQuery = async (where: Prisma.QuestionWhereInput) =>
  prisma.question.count({ where: { ...where, deleted: false } });

export const findRandomQuestions = async (
  studyId: string,
  userId: string,
  difficulty: Difficulty,
  category?: string,
): Promise<QuestionWithOptionsNoAnswer[]> => {
  const where: Prisma.QuestionWhereInput = { studyId, deleted: false };
  if (category) where.category = category;

  const fetchRandomIds = async (): Promise<string[]> => {
    const basicIdsResult = (
      await prisma.question.findMany({
        where,
        select: { id: true },
      })
    ).map((b) => b.id);

    const fetchNewQuestions = async () =>
      (
        await prisma.question.findMany({
          where: {
            ...where,
            testResults: {
              none: {
                userId: userId,
                markAsNew: false,
              },
            },
          },
          select: {
            id: true,
          },
        })
      ).map((r) => r.id);

    if (difficulty === "all") {
      return basicIdsResult;
    }

    if (difficulty === "new") {
      let idsResult = await fetchNewQuestions();

      if (idsResult.length < 1) {
        await serverMarkAllTestResultsAsNew(userId);
        idsResult = await fetchNewQuestions();
      }

      if (idsResult.length < testLength) {
        // We filter this to prevent repeated questions
        const filteredBasicIdsResult = basicIdsResult.filter(
          (b) => !idsResult.includes(b),
        );
        idsResult.push(
          ...shuffle(filteredBasicIdsResult).slice(
            0,
            testLength - idsResult.length,
          ),
        );
      }

      return idsResult;
    }

    if (difficulty === "difficult") {
      const results = await prisma.testResult.findMany({
        where: onlyActiveTestResults({ studyId, question: { category } }),
        select: {
          questionId: true,
          option: {
            select: { answer: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const stats = results.reduce<{
        [key: string]: { wrong: number; total: number };
      }>((acc, tr) => {
        const qid = tr.questionId;
        if (!acc[qid]) acc[qid] = { total: 0, wrong: 0 };
        acc[qid].total++;
        if (!tr.option || tr.option.answer) acc[qid].wrong++;
        return acc;
      }, {});

      const hardest = Object.entries(stats)
        .map(([questionId, { total, wrong }]) => ({
          questionId,
          wrongRatio: (wrong / total) * 100,
        }))
        .sort((a, b) => b.wrongRatio - a.wrongRatio);
      const hardestIdsList = hardest.map((h) => h.questionId);

      // The code belows makes sure we only show hardest questions that user has not finished yet or are not marked with markedAsNew
      const newQuestions = await fetchNewQuestions();
      const idsResult = hardestIdsList.filter((i) => newQuestions.includes(i));

      if (idsResult.length < testLength) {
        // We filter this to prevent repeated questions
        const filteredBasicIdsResult = basicIdsResult.filter(
          (b) => !idsResult.includes(b),
        );
        idsResult.push(
          ...filteredBasicIdsResult.slice(0, testLength - idsResult.length),
        );
      }

      return idsResult;
    }

    if (difficulty === "errados") {
      const wrongTestResults = await prisma.testResult.findMany({
        where: onlyActiveTestResults({
          studyId,
          question: { category },
          userId,
          option: {
            answer: false,
          },
        }),
        select: {
          questionId: true,
        },
      });

      const idsResult = [...new Set(wrongTestResults.map((h) => h.questionId))];

      if (idsResult.length < testLength) {
        // We filter this to prevent repeated questions
        const filteredBasicIdsResult = basicIdsResult.filter(
          (b) => !idsResult.includes(b),
        );
        idsResult.push(
          ...filteredBasicIdsResult.slice(0, testLength - idsResult.length),
        );
      }

      return idsResult;
    }

    if (difficulty === "weak") {
      // Priority order: latest answer wrong or blank, never seen, then the rest.
      const results = await prisma.testResult.findMany({
        where: onlyActiveTestResults({
          studyId,
          userId,
          ...(category ? { question: { category } } : {}),
        }),
        select: { questionId: true, option: { select: { answer: true } } },
        orderBy: { createdAt: "desc" },
      });

      const latestWasCorrect = new Map<string, boolean>();
      for (const result of results) {
        if (!latestWasCorrect.has(result.questionId)) {
          latestWasCorrect.set(
            result.questionId,
            result.option?.answer === true,
          );
        }
      }

      const wrong = basicIdsResult.filter(
        (id) => latestWasCorrect.get(id) === false,
      );
      const unseen = basicIdsResult.filter((id) => !latestWasCorrect.has(id));
      const correct = basicIdsResult.filter(
        (id) => latestWasCorrect.get(id) === true,
      );

      return [...shuffle(wrong), ...shuffle(unseen), ...shuffle(correct)].slice(
        0,
        testLength,
      );
    }

    return basicIdsResult;
  };

  const allIds = await fetchRandomIds();
  if (allIds.length === 0) return [];

  const selectedIds = shuffle(allIds).slice(0, testLength);

  const questions = await prisma.question.findMany({
    where: { id: { in: selectedIds }, deleted: false },
    include: {
      options: {
        where: activeOptionsWhere,
        omit: { answer: true },
      },
    },
  });

  const questionsById = new Map(questions.map((q) => [q.id, q]));
  const ordered = selectedIds
    .map((id) => questionsById.get(id))
    .filter(Boolean) as QuestionWithOptionsNoAnswer[];

  return ordered;
};

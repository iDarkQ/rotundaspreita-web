"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/app/_lib/prisma";
import { serverMarkAllTestResultsAsNew } from "@/app/_services/server/test-results-service";
import { Difficulty } from "@/app/_types/difficulty";
import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { shuffle } from "@/app/_utils/shuffle";

const testLength = Number(process.env.NEXT_PUBLIC_TEST_LENGTH) ?? 30;

export const createQuestionQuery = async (data: Prisma.QuestionCreateInput) =>
  prisma.question.create({ data, include: { options: true } });

export const updateQuestionQuery = async (
  where: Prisma.QuestionWhereUniqueInput,
  data: Prisma.QuestionUpdateInput,
) => prisma.question.update({ where, data, include: { options: true } });

export const deleteQuestionQuery = async (
  where: Prisma.QuestionWhereUniqueInput,
) => prisma.question.delete({ where });

export const findManyQuestionsQuery = async (
  where: Prisma.QuestionWhereInput,
  take?: number,
  skip?: number,
) =>
  prisma.question.findMany({
    where,
    include: { options: true },
    take,
    skip,
    orderBy: { createdAt: "desc" },
  });

export const findQuestionQuery = async (where: Prisma.QuestionWhereInput) =>
  prisma.question.findFirst({ where, include: { options: true } });

export const countQuestionsQuery = async (where: Prisma.QuestionWhereInput) =>
  prisma.question.count({ where });

export const findRandomQuestions = async (
  studyId: string,
  userId: string,
  difficulty: Difficulty,
  category?: string,
): Promise<QuestionWithOptionsNoAnswer[]> => {
  const where: Prisma.QuestionWhereInput = { studyId };
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
        where: { studyId, question: { category } },
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

      // The code belows makes sure we only show hardest questions that user has not finished yet or are not marked with markedAsNew
      const newQuestions = await fetchNewQuestions();
      const idsResult = hardest
        .map((h) => h.questionId)
        .filter((i) => newQuestions.includes(i));

      if (hardest.length < testLength) {
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

    return basicIdsResult;
  };

  const allIds = await fetchRandomIds();
  if (allIds.length === 0) return [];

  const selectedIds = shuffle(allIds).slice(0, testLength);

  const questions = await prisma.question.findMany({
    where: { id: { in: selectedIds } },
    include: {
      options: {
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

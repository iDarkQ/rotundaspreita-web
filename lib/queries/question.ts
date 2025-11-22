"use server";

import { Prisma, Question } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { QuestionWithOptionsNoAnswer } from "@/types/question-with-options-no-answer";

export const createQuestionQuery = async (data: Prisma.QuestionCreateInput) =>
    prisma.question.create({ data, include: { options: true } })

export const updateQuestionQuery = async (
    where: Prisma.QuestionWhereUniqueInput,
    data: Prisma.QuestionUpdateInput
) =>
    prisma.question.update({ where, data, include: { options: true } });

export const deleteQuestionQuery = async (where: Prisma.QuestionWhereUniqueInput) => prisma.question.delete({ where });

export const findManyQuestionsQuery = async (where: Prisma.QuestionWhereInput) => prisma.question.findMany({ where, include: { options: true } });
export const findQuestionQuery = async (where: Prisma.QuestionWhereInput) => prisma.question.findFirst({ where, include: { options: true } });

const shuffle = <T>(arr: T[]): T[] => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const findRandomQuestions = async (
    studyId: string,
    category?: string
): Promise<QuestionWithOptionsNoAnswer[]> => {
    const where: Prisma.QuestionWhereInput = { studyId };
    if (category) where.category = category;

    const idsResult = await prisma.question.findMany({
        where,
        select: { id: true },
    });

    const allIds = idsResult.map((r) => r.id);
    if (allIds.length === 0) return [];

    const selectedIds = shuffle(allIds).slice(0, 30);

    const questions = await prisma.question.findMany({
        where: { id: { in: selectedIds } },
        include: {
            options: {
                omit: { answer: true }
            }
        },
    });

    const questionsById = new Map(questions.map((q) => [q.id, q]));
    const ordered = selectedIds
        .map((id) => questionsById.get(id))
        .filter(Boolean) as QuestionWithOptionsNoAnswer[];

    return ordered;
};
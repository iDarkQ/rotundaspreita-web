import prisma from "@/lib/prisma";
import { findManyQuestionsQuery, findRandomQuestions } from "@/lib/queries/question";
import { createStudyQuery, fetchFirstStudyQuery, fetchStudiesQuery, fetchStudyQuery, fetchStudyWithQuestionsQuery, updateStudyQuery } from "@/lib/queries/study"
import { Difficulty } from "@/types/difficulty";
import { TestAnswers } from "@/types/test-answer";

export const createStudy = async (title: string, description: string) => {
    return createStudyQuery({ title, description });
}

export const updateStudy = async (id: string, title: string, description: string) => {
    return updateStudyQuery({ id }, { title, description });
}

export const fetchAllStudies = async () => {
    return fetchStudiesQuery();
}

export const fetchStudyById = async (id: string) => fetchFirstStudyQuery({ id });

export const fetchAllStudyCategories = async (studyId: string) => {
    const study = await fetchStudyWithQuestionsQuery({ id: studyId });

    if (!study) return [];

    const categories = study.questions.filter((q) => q.category).map((q) => q.category!);
    return categories ?? [];
}

export const generateTest = async (studyId?: string, difficulty?: Difficulty, category?: string) => {
    const study = await fetchFirstStudyQuery({ id: studyId });
    const finalDifficulty = difficulty ?? Difficulty.all;

    if (!study) {
        return [];
    }

    const categories = await fetchAllStudyCategories(study.id);
    const finalCategory = categories.find((c) => c === category);

    const questions = await findRandomQuestions(study.id, finalCategory);

    console.log({ questions })
    return questions;
}

export const verifyTestResults = async (answers: TestAnswers) => {
    const ids = Object.keys(answers);

    if (ids.length > 30) return;

    const questions = await findManyQuestionsQuery({ id: { in: ids } });

    const correctAnswers = questions.reduce<TestAnswers>((acc, q) => {
        acc[q.id] = q.options.find((o) => o.answer)?.id;
        return acc;
    }, {});

    return correctAnswers;
}
"use server";

import { findManyQuestionsQuery, findRandomQuestions } from "@/lib/queries/question";
import { createStudyQuery, deleteStudyQuery, fetchFirstStudyQuery, fetchStudiesQuery, fetchStudyWithQuestionsQuery, updateStudyQuery } from "@/lib/queries/study"
import { createTestResults } from "@/services/test-results-service";
import { verifySession, verifyAdminPermissions, verifySessionSubscription } from "@/services/user-service";
import { Difficulty } from "@/types/difficulty";
import { TestAnswers } from "@/types/test-answer";

export const createStudy = async (title: string) => {
    const session = await verifyAdminPermissions();
    if (!session) return;

    return createStudyQuery({ title });
}

export const updateStudy = async (id: string, title: string) => {
    const session = await verifyAdminPermissions();
    if (!session) return;

    return updateStudyQuery({ id }, { title });
}

export const deleteStudy = async (id: string) => {
    const session = await verifyAdminPermissions();
    if (!session) return;

    return deleteStudyQuery({ id });
}

export const fetchAllStudies = async () => {
    return fetchStudiesQuery();
}

export const fetchStudyById = async (id: string) => {
    const session = await verifySession();
    if (!session) return undefined;

    return fetchFirstStudyQuery({ id });
}

export const fetchAllStudyCategories = async (studyId: string) => {
    const study = await fetchStudyWithQuestionsQuery({ id: studyId });

    if (!study) return [];

    const categories = new Set(...[study.questions.filter((q) => q.category).map((q) => q.category!)]);
    return [...categories];
}

export const generateTest = async (studyId?: string, difficulty?: Difficulty, category?: string) => {
    const session = await verifySessionSubscription();
    if (!session) return;

    const study = await fetchFirstStudyQuery({ id: studyId });
    const finalDifficulty = difficulty ?? Difficulty.all;

    if (!study) {
        return [];
    }

    const categories = await fetchAllStudyCategories(study.id);
    const finalCategory = categories.find((c) => c === category);

    const questions = await findRandomQuestions(study.id, session.id, finalDifficulty, finalCategory);

    return questions;
}

export const verifyTestResults = async (studyId: string, answers: TestAnswers) => {
    const session = await verifySessionSubscription();
    if (!session) return;

    const study = await fetchStudyById(studyId);
    if (!study) return;

    const ids = Object.keys(answers);

    if (ids.length > 30) return;

    const questions = await findManyQuestionsQuery({ id: { in: ids }, studyId });

    const correctAnswers = questions.reduce<TestAnswers>((acc, q) => {
        acc[q.id] = q.options.find((o) => o.answer)?.id;
        return acc;
    }, {});

    questions.map(async (question) => {
        const option = question.options.find((o) => o.id === answers[question.id]);
        if (!option) return;

        await createTestResults(question.id, question.studyId, session.id, option.id);
    });

    return correctAnswers;
}
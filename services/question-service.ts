"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { OptionLetter } from "@/app/generated/prisma/enums";
import { SearchResults } from "@/lib/dtos/question/search-results";
import { UpdateQuestionDto } from "@/lib/dtos/question/update-question-option.dto";
import { countQuestionsQuery, createQuestionQuery, deleteQuestionQuery, findManyQuestionsQuery, findQuestionQuery, updateQuestionQuery } from "@/lib/queries/question";
import { fetchTestResultsQuery } from "@/lib/queries/test-results";
import { verifySession, verifyAdminPermissions } from "@/services/user-service";

interface OptionProp {
    letter: OptionLetter;
    content: string;
    answer: boolean;
}

const take = 4;

export const createQuestion = async (studyId: string, content: string, category: string, options: OptionProp[]) => {
    const session = await verifyAdminPermissions();
    if (!session) return;

    return createQuestionQuery({
        content, category, study: {
            connect: {
                id: studyId
            }
        },
        options: {
            create: options,
        },
    });
}

export const updateQuestion = async (id: string, content: string, category: string, options: UpdateQuestionDto[]) => {
    const session = await verifyAdminPermissions();
    if (!session) return;

    const existingOptions = (await findQuestionQuery({ id }));

    if (!existingOptions) return;

    const optionsToCreate = options
        .filter(o => !existingOptions.options.some(eO => eO.id === o.id))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ id, ...rest }) => rest);
    const optionsToUpdate = options.filter(o => o.id && existingOptions.options.find(e => e.id === o.id));
    const optionsToDelete = existingOptions.options.filter(e => !options.find(o => o.id === e.id));

    return updateQuestionQuery({ id }, {
        content,
        category,
        options: {
            create: optionsToCreate,
            update: optionsToUpdate.map(o => ({
                where: { id: o.id },
                data: { content: o.content, letter: o.letter, answer: o.answer }
            })),
            delete: optionsToDelete.map(o => ({ id: o.id }))
        }
    })
}

export const deleteQuestion = async (id: string) => {
    const session = await verifyAdminPermissions();
    if (!session) return;

    return deleteQuestionQuery({ id });
}

export const searchForQuestions = async (studyId: string, searchText?: string, page?: number): Promise<SearchResults | undefined> => {
    const session = await verifySession();

    if (!session) return;

    const where: Prisma.QuestionWhereInput = {
        studyId,
        ...(searchText
            ? {
                content: {
                    contains: searchText,
                    mode: "insensitive",
                },
            }
            : {}),
    };

    const totalCount = await countQuestionsQuery(where);

    const maxPages = take ? Math.ceil(totalCount / take) : 1;

    return { questions: (await findManyQuestionsQuery(where, take, page && page * take)), maxPages };
}

export const countQuestions = async (studyId?: string, category?: string) => {
    const session = await verifySession();
    if (!session) return 0;

    return countQuestionsQuery({ category, studyId });
}

export const countAnsweredQuestions = async () => {
    const session = await verifySession();
    if (!session) return {};

    const results = await fetchTestResultsQuery({ userId: session.id });

    const questionids = results.reduce<{ [key: string]: number }>((prev, curr) => {
        const id = curr.questionId;
        prev[id] = (prev[id] ?? 0) + 1;
        return prev;
    }, {});

    return questionids;
};

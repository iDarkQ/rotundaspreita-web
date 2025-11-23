import { OptionLetter } from "@/app/generated/prisma/enums";
import { UpdateQuestionDto } from "@/lib/dtos/question/update-question-option.dto";
import { createQuestionQuery, deleteQuestionQuery, findManyQuestionsQuery, findQuestionQuery, updateQuestionQuery } from "@/lib/queries/question";

interface OptionProp {
    letter: OptionLetter;
    content: string;
    answer: boolean;
}

export const createQuestion = async (studyId: string, content: string, category: string, options: OptionProp[]) => {
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
    return deleteQuestionQuery({ id });
}

export const findStudyQuestions = async (studyId: string) => {
    return findManyQuestionsQuery({ studyId });
}
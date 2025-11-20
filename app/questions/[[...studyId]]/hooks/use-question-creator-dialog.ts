"use client";

import { OptionLetter } from "@/app/generated/prisma/enums";
import { UpdateQuestionDto } from "@/lib/dtos/question/update-question-option.dto";
import {
    createQuestion,
    updateQuestion,
    deleteQuestion,
} from "@/services/question-service";
import { useCallback, useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import { Option, Question } from "@/app/generated/prisma/browser";
import { useManageFetchedQuestions } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";

const MAX_ANSWERS = 5;

interface Props {
    onClose: () => void;
    baseQuestion?: Question;
    baseOptions?: Option[];
    selectedStudy: string;
}

export const useQuestionCreatorDialog = ({ onClose, baseQuestion, baseOptions, selectedStudy }: Props) => {
    const { updateLocalQuestion, createLocalQuestion, removeLocalQuestion } = useManageFetchedQuestions();

    const [selectedAnswerId, setSelectedAnswerId] = useState<string | undefined>(
        undefined
    );
    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("");

    const [optionsDto, setOptionsDto] = useState<UpdateQuestionDto[]>([
        { id: createId(), letter: "A", content: "", answer: true },
        { id: createId(), letter: "B", content: "", answer: false },
    ]);

    useEffect(() => {
        if (baseQuestion) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setQuestion(baseQuestion.content ?? "");
            setCategory(baseQuestion.category ?? "")
        }

        if (baseOptions && baseOptions.length > 0) {
            const mapped = baseOptions
                .sort((a, b) => a.letter.localeCompare(b.letter))
                .map((o, idx) => ({
                    id: o.id ?? createId(),
                    letter: (o.letter ?? String.fromCharCode(65 + idx)) as OptionLetter,
                    content: o.content ?? "",
                    category: undefined,
                    answer: !!o.answer,
                })) as UpdateQuestionDto[];

            setOptionsDto(mapped);

            const correct = mapped.find((o) => o.answer)?.id;
            setSelectedAnswerId(correct);
        } else if (!baseOptions && !baseQuestion) {
            setSelectedAnswerId(undefined);
        }
    }, [baseQuestion, baseOptions]);

    const optionLetter = useCallback(
        (index: number) => String.fromCharCode(65 + index) as OptionLetter,
        []
    );

    const updateOptionContent = useCallback((id: string, content: string) => {
        setOptionsDto((prev) =>
            prev.map((o) => (o.id === id ? { ...o, content } : o))
        );
    }, []);

    const setCorrectAnswer = useCallback((id: string) => {
        setOptionsDto((prev) => prev.map((o) => ({ ...o, answer: o.id === id })));
        setSelectedAnswerId(id);
    }, []);

    const addAnswer = () => {
        if (optionsDto.length >= MAX_ANSWERS) return;
        setOptionsDto((prev) => [
            ...prev,
            { id: createId(), letter: "A", content: "", answer: false },
        ]);
    };

    const removeAnswer = (id: string) => {
        setOptionsDto((prev) => prev.filter((o) => id !== o.id));
    };

    const buildPayload = () => ({
        question: question.trim(),
        category: category.trim(),
        options: optionsDto.map((o, i) => ({ ...o, letter: optionLetter(i) })),
    });

    const handleDelete = async () => {
        if (!baseQuestion?.id) return;
        try {
            await deleteQuestion(baseQuestion.id);
            removeLocalQuestion(baseQuestion.id);
            onClose();
        } catch (err) {
            console.error("Failed to delete question", err);
        }
    };

    const handleCreateOrSave = async () => {
        if (!question.trim() || optionsDto.length < 2) return;
        const payload = buildPayload();

        try {
            if (baseQuestion?.id) {
                const returnedQuestion = await updateQuestion(
                    baseQuestion.id,
                    payload.question,
                    payload.category,
                    payload.options
                );
                if (!returnedQuestion) return;
                updateLocalQuestion(returnedQuestion);

            } else {
                const returnedQuestion = await createQuestion(selectedStudy, payload.question, payload.category, payload.options);
                createLocalQuestion(returnedQuestion);
            }

            onClose();
        } catch (err) {
            console.error("Failed to save question", err);
        }
    };

    const canAddMore = optionsDto.length < MAX_ANSWERS;
    const canCreate = question.trim().length > 0 && optionsDto.length >= 2;
    const isEditMode = Boolean(baseQuestion);

    return { canCreate, isEditMode, question, setQuestion, category, setCategory, optionsDto, optionLetter, selectedAnswerId, removeAnswer, setCorrectAnswer, updateOptionContent, canAddMore, addAnswer, handleCreateOrSave, handleDelete };
}
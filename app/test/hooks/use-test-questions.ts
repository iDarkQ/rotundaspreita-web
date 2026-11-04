"use client";

import { posthogClient } from "@/app/_lib/instrumentation-client";
import { fetchTestQuestion } from "@/app/_services/study-service";
import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { TestQuestionFailure } from "@/app/_types/started-test";
import { useEffect, useRef, useState } from "react";

export type TestQuestionLoadError = TestQuestionFailure | "network";

interface Props {
  token: string;
  questionIds: string[];
  initialQuestion: QuestionWithOptionsNoAnswer;
  selectedPage: string;
}

// Questions are requested one at a time, only when the user reaches them.
export const useTestQuestions = ({
  token,
  questionIds,
  initialQuestion,
  selectedPage,
}: Props) => {
  const [loaded, setLoaded] = useState<
    Record<string, QuestionWithOptionsNoAnswer>
  >({ [initialQuestion.id]: initialQuestion });
  const [errors, setErrors] = useState<Record<string, TestQuestionLoadError>>(
    {},
  );
  const requested = useRef(new Set([initialQuestion.id]));

  useEffect(() => {
    const load = async (id: string) => {
      if (requested.current.has(id)) return;
      requested.current.add(id);

      let question: QuestionWithOptionsNoAnswer | undefined;
      let reason: TestQuestionLoadError = "not-found";
      let errorMessage: string | undefined;

      try {
        const result = await fetchTestQuestion(token, id);
        question = result.question;
        reason = result.failure ?? reason;
      } catch (error) {
        reason = "network";
        errorMessage = error instanceof Error ? error.message : String(error);
      }

      if (question) {
        setLoaded((prev) => ({ ...prev, [id]: question }));
        return;
      }

      requested.current.delete(id);

      posthogClient?.capture("test_question_load_failed", {
        reason,
        error_message: errorMessage,
        question_id: id,
        position: questionIds.indexOf(id) + 1,
        question_count: questionIds.length,
        prefetch: id !== selectedPage,
        online: navigator.onLine,
      });

      if (id === selectedPage) {
        setErrors((prev) => ({ ...prev, [id]: reason }));
      }
    };

    const nextId = questionIds[questionIds.indexOf(selectedPage) + 1];

    load(selectedPage);
    if (nextId) load(nextId);
  }, [token, questionIds, selectedPage]);

  const currentQuestion = loaded[selectedPage];

  return {
    currentQuestion,
    loadError: currentQuestion ? undefined : errors[selectedPage],
  };
};

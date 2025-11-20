"use client";

import { Option, Question, Study } from "@/app/generated/prisma/browser";
import { QuestionWithOptions } from "@/types/question-with-options";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ManageFetchedQuestionsContextProps {
  questions: QuestionWithOptions[];
  selectedQuestion?: string;
  setSelectedQuestion: Dispatch<SetStateAction<string | undefined>>;
  updateLocalQuestion: (question: QuestionWithOptions) => void;
  createLocalQuestion: (question: QuestionWithOptions) => void;
  removeLocalQuestion: (id: string) => void;
}

interface ManageFetchedQuestionsProviderProps {
  questions: QuestionWithOptions[];
  children: ReactNode;
}

const ManageFetchedQuestionsContext = createContext<
  ManageFetchedQuestionsContextProps | undefined
>(undefined);

export const ManageFetchedQuestionsProvider = ({
  children,
  questions: baseQuestions,
}: ManageFetchedQuestionsProviderProps) => {
  const [questions, setQuestions] =
    useState<QuestionWithOptions[]>(baseQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>(
    undefined
  );

  const updateLocalQuestion = (question: QuestionWithOptions) => {
    setQuestions((prev) =>
      prev.map((oldQuestion) =>
        oldQuestion.id === question.id ? question : oldQuestion
      )
    );
  };

  const createLocalQuestion = (question: QuestionWithOptions) => {
    setQuestions((prev) => [...prev, question]);
  };

  const removeLocalQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ManageFetchedQuestionsContext.Provider
      value={{
        questions,
        selectedQuestion,
        setSelectedQuestion,
        updateLocalQuestion,
        createLocalQuestion,
        removeLocalQuestion,
      }}
    >
      {children}
    </ManageFetchedQuestionsContext.Provider>
  );
};

export const useManageFetchedQuestions = () => {
  const context = useContext(ManageFetchedQuestionsContext);

  if (!context) {
    throw Error(
      "useManageFetchedQuestions has to be used within ManageFetchedQuestionsProvider"
    );
  }

  return context;
};

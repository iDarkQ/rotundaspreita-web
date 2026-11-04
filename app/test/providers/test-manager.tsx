"use client";

import { verifyTestResults } from "@/app/_services/study-service";
import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { TestAnswers } from "@/app/_types/test-answer";
import {
  TestQuestionLoadError,
  useTestQuestions,
} from "@/app/test/hooks/use-test-questions";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface TestManagerContextProps {
  questionIds: string[];
  currentQuestion?: QuestionWithOptionsNoAnswer;
  loadError?: TestQuestionLoadError;
  answers: TestAnswers;
  setAnswers: Dispatch<SetStateAction<TestAnswers>>;
  finishTest: () => Promise<void>;
  finished: boolean;
  selectedPage: string;
  correctAnswers: TestAnswers;
  setFinished: Dispatch<SetStateAction<boolean>>;
  updateSelectedQuestion: (value: string) => void;
  setCorrectAnswers: Dispatch<SetStateAction<TestAnswers>>;
}

interface TestManagerProviderProps {
  token: string;
  questionIds: string[];
  firstQuestion: QuestionWithOptionsNoAnswer;

  children: ReactNode;
}

const TestManagerContext = createContext<TestManagerContextProps | undefined>(
  undefined,
);

export const TestManagerProvider = ({
  children,
  token,
  questionIds,
  firstQuestion,
}: TestManagerProviderProps) => {
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<TestAnswers>(
    questionIds.reduce((acc, id) => {
      acc[id] = null;
      return acc;
    }, {} as TestAnswers),
  );
  const [selectedPage, setSelectedPage] = useState<string>(questionIds[0]);
  const [correctAnswers, setCorrectAnswers] = useState<TestAnswers>({});
  const { currentQuestion, loadError } = useTestQuestions({
    token,
    questionIds,
    initialQuestion: firstQuestion,
    selectedPage,
  });

  const finishTest = async () => {
    const results = await verifyTestResults(token, answers);

    setCorrectAnswers(results ?? {});
    updateSelectedQuestion(questionIds[0]);
    setFinished(true);
  };

  const updateSelectedQuestion = (value: string) => {
    setSelectedPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TestManagerContext.Provider
      value={{
        questionIds,
        currentQuestion,
        loadError,
        answers,
        setAnswers,
        finishTest,
        setFinished,
        finished,
        correctAnswers,
        setCorrectAnswers,
        selectedPage,
        updateSelectedQuestion,
      }}
    >
      {children}
    </TestManagerContext.Provider>
  );
};

export const useTestManager = () => {
  const context = useContext(TestManagerContext);

  if (!context) {
    throw Error("useTestManager has to be used within TestManagerProvider");
  }

  return context;
};

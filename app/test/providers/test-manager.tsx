"use client";

import { verifyTestResults } from "@/app/_services/study-service";
import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { TestAnswers } from "@/app/_types/test-answer";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface TestManagerContextProps {
  questions: QuestionWithOptionsNoAnswer[];
  answers: TestAnswers;
  setAnswers: Dispatch<SetStateAction<TestAnswers>>;
  finishTest: () => Promise<void>;
  finished: boolean;
  selectedPage: string;
  correctAnswers: TestAnswers;
  setFinished: Dispatch<SetStateAction<boolean>>;
  setSelectedPage: Dispatch<SetStateAction<string>>;
  setCorrectAnswers: Dispatch<SetStateAction<TestAnswers>>;
}

interface TestManagerProviderProps {
  questions: QuestionWithOptionsNoAnswer[];

  children: ReactNode;
}

const TestManagerContext = createContext<TestManagerContextProps | undefined>(
  undefined
);

export const TestManagerProvider = ({
  children,
  questions,
}: TestManagerProviderProps) => {
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<TestAnswers>(
    questions.reduce((acc, q) => {
      acc[q.id] = null;
      return acc;
    }, {} as TestAnswers)
  );
  const [selectedPage, setSelectedPage] = useState<string>(questions[0].id);
  const [correctAnswers, setCorrectAnswers] = useState<TestAnswers>({});

  const finishTest = async () => {
    if (!questions) return;

    const results = await verifyTestResults(questions[0].studyId, answers);

    setCorrectAnswers(results ?? {});
    setSelectedPage(questions[0].id);
    setFinished(true);
  };

  return (
    <TestManagerContext.Provider
      value={{
        questions,
        answers,
        setAnswers,
        finishTest,
        setFinished,
        finished,
        correctAnswers,
        setCorrectAnswers,
        selectedPage,
        setSelectedPage,
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

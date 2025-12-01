"use client";

import { useManageSelectedStudy } from "@/app/questions/[[...studyId]]/providers/manage-selected-study";
import { SearchResults } from "@/lib/dtos/question/search-results";
import { searchForQuestions } from "@/services/question-service";
import { QuestionWithOptions } from "@/types/question-with-options";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ManageFetchedQuestionsContextProps {
  inputRef: RefObject<HTMLInputElement | null>;
  questions: QuestionWithOptions[];
  setQuestions: Dispatch<SetStateAction<QuestionWithOptions[]>>;
  selectedQuestion?: string;
  setSelectedQuestion: Dispatch<SetStateAction<string | undefined>>;
  updateLocalQuestion: (question: QuestionWithOptions) => void;
  createLocalQuestion: (question: QuestionWithOptions) => void;
  removeLocalQuestion: (id: string) => void;

  maxPagesRef: RefObject<number>;

  page: number;
  loading: boolean;
  finish: boolean;

  setPage: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFinish: Dispatch<SetStateAction<boolean>>;

  fetchSearchResults: (page?: number) => Promise<SearchResults | undefined>;
}

interface ManageFetchedQuestionsProviderProps {
  questions: QuestionWithOptions[];
  maxPages: number;
  children: ReactNode;
}

const ManageFetchedQuestionsContext = createContext<
  ManageFetchedQuestionsContextProps | undefined
>(undefined);

export const ManageFetchedQuestionsProvider = ({
  children,
  maxPages,
  questions: baseQuestions,
}: ManageFetchedQuestionsProviderProps) => {
  const { study: selectedStudy } = useManageSelectedStudy();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const [questions, setQuestions] =
    useState<QuestionWithOptions[]>(baseQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>(
    undefined
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const maxPagesRef = useRef(maxPages);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const updateLocalQuestion = (question: QuestionWithOptions) => {
    setQuestions((prev) =>
      prev.map((oldQuestion) =>
        oldQuestion.id === question.id ? question : oldQuestion
      )
    );
  };

  const createLocalQuestion = (question: QuestionWithOptions) => {
    setQuestions((prev) => [question, ...prev]);
  };

  const removeLocalQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((p) => p.id !== id));
  };

  const fetchSearchResults = useCallback(async (page: number = 0) => {
    const query = inputRef.current?.value || "";
    const searchResults = await searchForQuestions(selectedStudy.id, query, page);
    if (searchResults) maxPagesRef.current = searchResults.maxPages;

    return searchResults;
  }, [selectedStudy]);

  useEffect(() => {
    const handleInputChange = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(async () => {
        const searchResults = await fetchSearchResults();
        if (!searchResults) return;

        setFinish(searchResults.maxPages <= 1);
        setPage(1);
        setQuestions(searchResults?.questions);
      }, 500);
    };
    const inputEl = inputRef.current;
    if (!inputEl) return;

    inputEl?.addEventListener("input", handleInputChange);
    return () => {
      inputEl?.removeEventListener("input", handleInputChange);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [selectedStudy, inputRef, fetchSearchResults]);

  return (
    <ManageFetchedQuestionsContext.Provider
      value={{
        maxPagesRef,
        inputRef,
        questions,
        setQuestions,
        selectedQuestion,
        setSelectedQuestion,
        updateLocalQuestion,
        createLocalQuestion,
        removeLocalQuestion,

        page,
        setPage,
        loading,
        setLoading,
        finish,
        setFinish,

        fetchSearchResults,
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

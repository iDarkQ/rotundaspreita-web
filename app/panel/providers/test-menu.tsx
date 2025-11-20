"use client";

import { Study } from "@/app/generated/prisma/browser";
import { fetchAllStudyCategories } from "@/services/study-service";
import { Difficulty } from "@/types/difficulty";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface TestMenuContextProps {
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  studies: Study[];
  selectedStudy?: Study;
  selectedStudyId: string | undefined;
  selectedCategory: string;
  listedCategories: string[];
  setSelectedStudyId: Dispatch<SetStateAction<string | undefined>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  setListedCategories: Dispatch<SetStateAction<string[]>>;
}

interface TestMenuProviderProps {
  studies: Study[];
  categories: string[];
  defaultStudyId?: string;

  children: ReactNode;
}

const TestMenuContext = createContext<TestMenuContextProps | undefined>(
  undefined
);

export const TestMenuProvider = ({
  children,
  studies,
  categories,
  defaultStudyId,
}: TestMenuProviderProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(0);

  const [selectedStudyId, setSelectedStudyId] = useState<string | undefined>(
    defaultStudyId
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [listedCategories, setListedCategories] =
    useState<string[]>(categories);

  const selectedStudy = studies.find((s) => s.id === selectedStudyId);

  useEffect(() => {
    if (!selectedStudyId) return;

    const fetchNewCategories = async () => {
      const newCategories = await fetchAllStudyCategories(selectedStudyId);
      if (newCategories.length > 0) {
        setListedCategories(["Todos", ...newCategories]);
        setSelectedCategory("Todos");
      } else {
        setSelectedCategory("Todos");
        setListedCategories([]);
      }
    };

    fetchNewCategories();
  }, [selectedStudyId]);

  return (
    <TestMenuContext.Provider
      value={{
        setDifficulty,
        difficulty,
        studies,
        selectedStudy,
        selectedStudyId,
        selectedCategory,
        listedCategories,
        setSelectedStudyId,
        setSelectedCategory,
        setListedCategories,
      }}
    >
      {children}
    </TestMenuContext.Provider>
  );
};

export const useTestMenu = () => {
  const context = useContext(TestMenuContext);

  if (!context) {
    throw Error("useTestMenu has to be used within TestMenuProvider");
  }

  return context;
};

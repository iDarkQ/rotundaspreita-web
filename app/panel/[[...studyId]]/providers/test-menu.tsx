"use client";

import { Study } from "@/app/generated/prisma/browser";
import { fetchAllStudyCategories } from "@/app/_services/study-service";
import { Difficulty } from "@/app/_types/difficulty";
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
  defaultStudyId: string;
  difficulty: Difficulty;
  setDifficulty: Dispatch<SetStateAction<Difficulty>>;
  studies: Study[];
  selectedStudy?: Study;
  selectedCategory: string;
  listedCategories: string[];
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  setListedCategories: Dispatch<SetStateAction<string[]>>;
}

interface TestMenuProviderProps {
  studies: Study[];
  categories: string[];
  defaultStudyId: string;

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
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.all);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [listedCategories, setListedCategories] =
    useState<string[]>(categories);

  const selectedStudy = studies.find((s) => s.id === defaultStudyId);

  useEffect(() => {
    const fetchNewCategories = async () => {
      const newCategories = await fetchAllStudyCategories(defaultStudyId);
      if (newCategories.length > 0) {
        setListedCategories(["Todos", ...newCategories]);
        setSelectedCategory("Todos");
      } else {
        setSelectedCategory("Todos");
        setListedCategories([]);
      }
    };

    fetchNewCategories();
  }, [defaultStudyId]);

  return (
    <TestMenuContext.Provider
      value={{
        defaultStudyId,
        setDifficulty,
        difficulty,
        studies,
        selectedStudy,
        selectedCategory,
        listedCategories,
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

"use client";

import { Study } from "@/app/generated/prisma/client";
import { searchForQuestions } from "@/app/_services/question-service";
import { QuestionWithOptions } from "@/app/_types/question-with-options";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ManageSelectedStudyContextProps {
  study: Study;
  categories: string[];
}

interface ManageSelectedStudyProviderProps {
  study: Study;
  categories: string[];
  children: ReactNode;
}

const ManageSelectedStudyContext = createContext<
  ManageSelectedStudyContextProps | undefined
>(undefined);

export const ManageSelectedStudyProvider = ({
  children,
  study,
  categories,
}: ManageSelectedStudyProviderProps) => {
  return (
    <ManageSelectedStudyContext.Provider
      value={{
        study,
        categories,
      }}
    >
      {children}
    </ManageSelectedStudyContext.Provider>
  );
};

export const useManageSelectedStudy = () => {
  const context = useContext(ManageSelectedStudyContext);

  if (!context) {
    throw Error(
      "useManageSelectedStudy has to be used within ManageSelectedStudyProvider"
    );
  }

  return context;
};

"use client";

import { Study } from "@/app/generated/prisma/client";
import { createContext, ReactNode, useContext } from "react";

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
}: ManageSelectedStudyProviderProps) => (
  <ManageSelectedStudyContext.Provider
    value={{
      study,
      categories,
    }}
  >
    {children}
  </ManageSelectedStudyContext.Provider>
);

export const useManageSelectedStudy = () => {
  const context = useContext(ManageSelectedStudyContext);

  if (!context) {
    throw Error(
      "useManageSelectedStudy has to be used within ManageSelectedStudyProvider",
    );
  }

  return context;
};

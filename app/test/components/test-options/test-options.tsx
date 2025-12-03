"use client";

import { Divider } from "@/app/_components/divider";
import { TestOptionsPagination } from "@/app/test/components/test-options/test-options-pagination";
import { useTestManager } from "@/app/test/providers/test-manager";
import { TestOptionsQuestion } from "@/app/test/components/test-options/test-options-question";
import { TestOptionsList } from "@/app/test/components/test-options/test-options-list";

export const TestOptions = () => {
  const { questions, selectedPage } = useTestManager();

  const question = questions.find((q) => q.id === selectedPage);

  const currentIndex = questions.findIndex((q) => q.id === selectedPage);
  const currentPage = currentIndex === -1 ? 0 : currentIndex + 1;

  return (
    <>
      <div className="flex min-h-[50vh] w-full flex-col items-center gap-5">
        <TestOptionsQuestion question={question?.content ?? ""} />
        <Divider orientation="horizontal" />
        <TestOptionsList />
      </div>
      <TestOptionsPagination page={currentPage} />
    </>
  );
};

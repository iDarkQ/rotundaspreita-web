"use client";

import { Divider } from "@/app/_components/divider";
import { Text } from "@/app/_components/text";
import { useCopyProtection } from "@/app/_hooks/use-copy-protection";
import { TestOptionsPagination } from "@/app/test/components/test-options/test-options-pagination";
import { useTestManager } from "@/app/test/providers/test-manager";
import { TestOptionsQuestion } from "@/app/test/components/test-options/test-options-question";
import { TestOptionsList } from "@/app/test/components/test-options/test-options-list";

export const TestOptions = () => {
  const { questionIds, currentQuestion, loadError, selectedPage } =
    useTestManager();
  const { ref } = useCopyProtection<HTMLDivElement>();

  const currentIndex = questionIds.indexOf(selectedPage);
  const currentPage = currentIndex === -1 ? 0 : currentIndex + 1;

  return (
    <>
      <div
        ref={ref}
        className="flex min-h-[50vh] w-full flex-col items-center gap-5 select-none"
      >
        <TestOptionsQuestion
          id={currentQuestion?.id}
          question={currentQuestion?.content ?? ""}
        />
        {loadError && (
          <Text as="p" className="text-error">
            {loadError === "limited"
              ? "Está a navegar demasiado depressa. Aguarde um momento e tente novamente."
              : "Não foi possível carregar a pergunta. Volte a tentar."}
          </Text>
        )}
        <Divider orientation="horizontal" />
        <TestOptionsList />
      </div>
      <TestOptionsPagination page={currentPage} />
    </>
  );
};

"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { TestFinishDialog } from "@/app/test/components/dialogs/test-finish-dialog";
import { useTestManager } from "@/app/test/providers/test-manager";
import { useState } from "react";

export const TestFinishButton = () => {
  const { finishTest, finished, answers } = useTestManager();
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    if (finished) {
      window.location.reload();
      return;
    }

    const finishedAllQuestions = !Object.values(answers).includes(null);

    if (!finishedAllQuestions) {
      setOpen(true);
      return;
    }

    finishTest();
  };

  return (
    <>
      <Button onClick={handleButtonClick}>
        <Text as="h3" className="text-white">
          {finished ? "Faça Outro Teste" : "Finalizar Teste"}
        </Text>
      </Button>
      {open && <TestFinishDialog onClose={() => setOpen(false)} />}
    </>
  );
};

"use client";

import { TestOptionsListItem } from "@/app/test/components/test-options/test-options-list-item";
import { useTestManager } from "@/app/test/providers/test-manager";
import { RadioGroup } from "@headlessui/react";

export const TestOptionsList = () => {
  const { questions, selectedPage } = useTestManager();

  const question = questions.find((q) => q.id === selectedPage);

  return (
    <div className="flex w-full flex-col gap-2">
      <RadioGroup className="flex flex-col gap-2">
        {question?.options.map((option) => (
          <TestOptionsListItem key={option.id} option={option} />
        ))}
      </RadioGroup>
    </div>
  );
};

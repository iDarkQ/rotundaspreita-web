"use client";

import { Link } from "@/app/_components/link";
import { useTestQuestionCount } from "@/app/panel/[[...studyId]]/hooks/use-test-question-count";
import { DEFAULT_TEST_QUESTION_COUNT } from "@/app/_utils/test-question-count";
import { ReactNode } from "react";

interface Props {
  params: Record<string, string>;
  children: ReactNode;
  className?: string;
}

export const PanelTestLink = ({ params, children, className }: Props) => {
  const [questionCount] = useTestQuestionCount();
  const searchParams = new URLSearchParams(params);

  if (questionCount !== DEFAULT_TEST_QUESTION_COUNT) {
    searchParams.set("n", String(questionCount));
  }

  return (
    <Link link={`/test?${searchParams.toString()}`} className={className}>
      {children}
    </Link>
  );
};

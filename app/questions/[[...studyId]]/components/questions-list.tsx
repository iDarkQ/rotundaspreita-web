"use client";

import { useEffect, useRef, useState } from "react";
import { Banner } from "@/app/_components/banner";
import { Text } from "@/app/_components/text";
import { User } from "@/app/generated/prisma/browser";
import { QuestionsCard } from "@/app/questions/[[...studyId]]/components/questions-card";
import { useManageFetchedQuestions } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";
import { searchForQuestions } from "@/services/question-service";
import clsx from "clsx";

interface Props {
  selectedStudy: string;
  responses: { [key: string]: number };
  categories: string[];
  user: User;
}

export const QuestionsList = ({
  selectedStudy,
  responses,
  categories,
  user,
}: Props) => {
  const {
    questions,
    setQuestions,
    inputRef,
    maxPagesRef,
    page,
    setPage,
    loading,
    setLoading,
    finish,
    setFinish,
  } = useManageFetchedQuestions();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current) return;

    const fetchMoreQuestions = async () => {
      if (
        loading ||
        finish ||
        (maxPagesRef.current > 0 && maxPagesRef.current === page)
      )
        return;

      const query = inputRef.current?.value || "";
      setLoading(true);

      const searchResults = await searchForQuestions(
        selectedStudy,
        query,
        page
      );

      if (searchResults && searchResults.questions.length > 0) {
        setQuestions((prev) => [...prev, ...searchResults.questions]);
        setPage((prev) => prev + 1);
        setLoading(false);
        return;
      }

      setLoading(false);
      setFinish(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchMoreQuestions();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.0,
      }
    );

    observer.observe(bottomRef.current);

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [
    finish,
    inputRef,
    loading,
    maxPagesRef,
    page,
    selectedStudy,
    setFinish,
    setLoading,
    setPage,
    setQuestions,
  ]);

  return (
    <>
      {questions.length < 1 && (
        <Banner center className="w-full">
          <Text>Não há questoes neste momento</Text>
        </Banner>
      )}
      <div className="overflow-auto grid grid-cols-2 gap-2 w-full">
        {questions.map((q, index) => (
          <QuestionsCard
            key={q.id ?? index}
            question={q}
            selectedStudy={selectedStudy}
            answeredCount={responses[q.id]}
            categories={categories}
            user={user}
          />
        ))}
        <div ref={bottomRef} className="h-4 col-span-2" />
      </div>

      {!finish && (
        <Text
          center
          className={clsx(
            "opacity-0 transition-opacity",
            loading && "opacity-100"
          )}
        >
          Carregando mais perguntas...
        </Text>
      )}
    </>
  );
};

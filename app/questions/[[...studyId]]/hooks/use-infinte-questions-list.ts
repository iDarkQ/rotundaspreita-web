"use client";

import { useEffect, useRef } from "react";
import { useManageFetchedQuestions } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";
import { useManageSelectedStudy } from "@/app/questions/[[...studyId]]/providers/manage-selected-study";

export const useInfiniteQuestionsList = () => {
    const { study, categories } = useManageSelectedStudy();

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
        fetchSearchResults,
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

            setLoading(true);

            const searchResults = await fetchSearchResults(page);

            if (searchResults && searchResults.questions.length > 0) {
                if (searchResults?.maxPages <= page) {
                    setFinish(true);
                }

                setQuestions((prev) => [...prev, ...searchResults.questions]);
                setPage((prev) => prev + 1);
            }

            setLoading(false);
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
    }, [finish, inputRef, loading, maxPagesRef, page, study, setFinish, setLoading, setPage, setQuestions, fetchSearchResults]);

    return { categories, questions, study, bottomRef, finish, loading };
}
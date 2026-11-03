"use client";

import {
  DEFAULT_TEST_QUESTION_COUNT,
  parseTestQuestionCount,
  TestQuestionCount,
} from "@/app/_utils/test-question-count";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "testQuestionCount";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

const getSnapshot = () => {
  try {
    return parseTestQuestionCount(localStorage.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_TEST_QUESTION_COUNT;
  }
};

const getServerSnapshot = () => DEFAULT_TEST_QUESTION_COUNT;

const saveCount = (count: TestQuestionCount) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(count));
  } catch {
    // Storage can be unavailable (e.g. private mode); the default still applies.
  }
  listeners.forEach((listener) => listener());
};

export const useTestQuestionCount = () => {
  const count = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return [count, saveCount] as const;
};

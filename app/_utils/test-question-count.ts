export const TEST_QUESTION_COUNT_OPTIONS = [10, 20, 30, 50, 100] as const;

export type TestQuestionCount = (typeof TEST_QUESTION_COUNT_OPTIONS)[number];

export const DEFAULT_TEST_QUESTION_COUNT: TestQuestionCount = 30;
export const RECOMMENDED_TEST_QUESTION_COUNT: TestQuestionCount = 30;
export const MAX_TEST_QUESTION_COUNT = Math.max(...TEST_QUESTION_COUNT_OPTIONS);

// Accepts only the exact canonical form of a whitelisted count, so values
// like "30.5", "1e2", "030" or "30abc" fall back to the default.
export const parseTestQuestionCount = (raw: unknown): TestQuestionCount => {
  const match = TEST_QUESTION_COUNT_OPTIONS.find(
    (option) => String(option) === raw || option === raw,
  );

  return match ?? DEFAULT_TEST_QUESTION_COUNT;
};

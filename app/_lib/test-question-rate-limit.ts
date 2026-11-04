import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

// A person reading a test fetches each question once, so this only slows bulk copying.
const limiter = new RateLimiterMemory({
  points: Number(process.env.TEST_QUESTION_FETCH_LIMIT) || 120,
  duration: 10 * 60,
});

export const consumeTestQuestionFetch = async (userId: string) => {
  try {
    await limiter.consume(userId);
    return true;
  } catch (error) {
    if (error instanceof RateLimiterRes) return false;
    throw error;
  }
};

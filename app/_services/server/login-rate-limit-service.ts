"use server";

import { isIP } from "node:net";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

const WINDOW_SECONDS = 15 * 60;

const accountLimiter = new RateLimiterMemory({
  points: 10,
  duration: WINDOW_SECONDS,
  blockDuration: WINDOW_SECONDS,
});

const ipLimiter = new RateLimiterMemory({
  points: 30,
  duration: WINDOW_SECONDS,
  blockDuration: WINDOW_SECONDS,
});

const consume = async (limiter: RateLimiterMemory, key: string) => {
  try {
    await limiter.consume(key);
    return true;
  } catch (error) {
    if (error instanceof RateLimiterRes) return false;
    throw error;
  }
};

export type LoginRateLimitResult = "allowed" | "limited" | "invalid-ip";

export const serverConsumeLoginAttempt = async (
  email: string,
  forwardedFor: string,
): Promise<LoginRateLimitResult> => {
  const clientIp = forwardedFor.split(",")[0]?.trim();
  if (!clientIp || isIP(clientIp) === 0) return "invalid-ip";

  const [accountAllowed, ipAllowed] = await Promise.all([
    consume(accountLimiter, email),
    consume(ipLimiter, clientIp),
  ]);

  return accountAllowed && ipAllowed ? "allowed" : "limited";
};

import jwt from "jsonwebtoken";

const AUDIENCE = "test-run";
const EXPIRES_IN = "6h";

interface TestRun {
  userId: string;
  studyId: string;
  questionIds: string[];
}

// Server-only: proves which questions were issued to a user for one test.
export const signTestRun = ({ userId, studyId, questionIds }: TestRun) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured.");

  return jwt.sign({ studyId, questionIds }, secret, {
    audience: AUDIENCE,
    subject: userId,
    expiresIn: EXPIRES_IN,
  });
};

export const readTestRun = (
  token: string,
  userId: string,
): TestRun | undefined => {
  const secret = process.env.JWT_SECRET;
  if (!secret || !token) return;

  try {
    const payload = jwt.verify(token, secret, {
      audience: AUDIENCE,
      subject: userId,
    }) as { studyId?: string; questionIds?: string[] };

    if (!payload.studyId || !Array.isArray(payload.questionIds)) return;

    return {
      userId,
      studyId: payload.studyId,
      questionIds: payload.questionIds,
    };
  } catch {
    return;
  }
};

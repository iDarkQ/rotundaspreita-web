import { Prisma } from "@/app/generated/prisma/client";

// Soft-deleted questions and options must be ignored everywhere (display and
// analytics), so every read goes through these filters.
export const activeOptionsWhere: Prisma.OptionWhereInput = { deleted: false };

export const activeTestResultWhere: Prisma.TestResultWhereInput = {
  question: { deleted: false },
  // A blank answer has no option, so only an existing option can be deleted.
  OR: [{ optionId: null }, { option: { deleted: false } }],
};

export const onlyActiveTestResults = (
  where: Prisma.TestResultWhereInput,
): Prisma.TestResultWhereInput => ({ AND: [where, activeTestResultWhere] });

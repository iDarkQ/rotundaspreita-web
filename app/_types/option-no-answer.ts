import { Option } from "@/app/generated/prisma/browser";

export type OptionNoAnswer = Omit<Option, "answer">;

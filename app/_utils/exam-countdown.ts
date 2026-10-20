import { ExamCountdownDto } from "@/app/_lib/dtos/test-results/readiness.dto";

const FALLBACK_TIMEZONE = "Europe/Lisbon";
const DAY_MS = 24 * 60 * 60 * 1000;

const todayInTimezone = (now: Date, timezone: string) => {
  const format = (zone: string) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

  try {
    return format(timezone);
  } catch {
    return format(FALLBACK_TIMEZONE);
  }
};

const toUtcDay = (date: string) => Date.parse(`${date}T00:00:00.000Z`);

export const computeExamCountdown = (
  examDate: Date | null,
  timezone: string | null,
  now: Date,
  unseenQuestions: number,
): ExamCountdownDto => {
  if (!examDate) return { status: "none" };

  // The exam date is stored as noon UTC of the chosen calendar date.
  const examDay = examDate.toISOString().slice(0, 10);
  const today = todayInTimezone(now, timezone ?? FALLBACK_TIMEZONE);
  const daysLeft = Math.round((toUtcDay(examDay) - toUtcDay(today)) / DAY_MS);

  if (daysLeft < 0) return { status: "past", examDate: examDay };
  if (daysLeft === 0) return { status: "today", examDate: examDay };

  return {
    status: "upcoming",
    examDate: examDay,
    daysLeft,
    weeksLeft: Math.floor(daysLeft / 7),
    questionsPerDay:
      unseenQuestions > 0 ? Math.ceil(unseenQuestions / daysLeft) : null,
  };
};

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../../app/generated/prisma/client";
import { execSync } from "node:child_process";
import {
  TEST_ADMIN_EMAIL,
  TEST_ADMIN_ID,
  TEST_CORRECT_ANSWER,
  TEST_EXAM_ADMIN_ID,
  TEST_EXAM_QUESTIONS,
  TEST_EXAM_STUDY_ID,
  TEST_FREE_QUESTION_TOTAL,
  TEST_FREE_STUDY_ID,
  TEST_FREE_USER_ID,
  TEST_GOOGLE_PASSWORD_USERS,
  freeQuestionCategory,
  freeQuestionId,
  TEST_LAST_TEST_ADMIN_ID,
  TEST_NOTIFICATION_ADMIN_IDS,
  TEST_PAYMENT_USER_EMAIL,
  TEST_PAYMENT_USER_ID,
  TEST_PASSWORD_USER_PASSWORD,
  TEST_PASSWORD_USERS,
  TEST_REGISTRATION_EMAILS,
  TEST_QUESTION,
  TEST_READINESS_CATEGORIES,
  TEST_READINESS_EMPTY_USER_ID,
  TEST_READINESS_STUDY_ID,
  TEST_READINESS_TEST_RUNS,
  TEST_READINESS_USER_ID,
  TEST_STUDY_ID,
} from "./test-constants";

async function setupTestDatabase() {
  const databaseUrl = process.env.PLAYWRIGHT_DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "PLAYWRIGHT_DATABASE_URL is required for Playwright setup.",
    );
  }

  const databaseName = decodeURIComponent(new URL(databaseUrl).pathname)
    .replace(/^\/+/, "")
    .split("/")[0];

  if (!/(^|[-_])test($|[-_])/i.test(databaseName)) {
    throw new Error(
      "Refusing to seed a database unless its name contains a separate 'test' segment.",
    );
  }

  const env = {
    ...process.env,
    DATABASE_URL: databaseUrl,
  };

  execSync("yarn prisma db push", {
    env,
    stdio: "inherit",
  });

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
  });

  try {
    await prisma.study.deleteMany({
      where: {
        id: {
          in: [
            TEST_STUDY_ID,
            TEST_EXAM_STUDY_ID,
            TEST_READINESS_STUDY_ID,
            TEST_FREE_STUDY_ID,
          ],
        },
      },
    });
    await prisma.user.deleteMany({
      where: {
        id: {
          in: [
            TEST_ADMIN_ID,
            TEST_EXAM_ADMIN_ID,
            TEST_LAST_TEST_ADMIN_ID,
            ...TEST_NOTIFICATION_ADMIN_IDS,
            ...TEST_PASSWORD_USERS.map(({ id }) => id),
            ...TEST_GOOGLE_PASSWORD_USERS.map(({ id }) => id),
            TEST_PAYMENT_USER_ID,
            TEST_READINESS_USER_ID,
            TEST_READINESS_EMPTY_USER_ID,
            TEST_FREE_USER_ID,
          ],
        },
      },
    });
    await prisma.user.deleteMany({
      where: { email: { in: [...TEST_REGISTRATION_EMAILS] } },
    });

    await prisma.user.create({
      data: {
        id: TEST_ADMIN_ID,
        email: TEST_ADMIN_EMAIL,
        name: "Utilizador de Teste",
        admin: true,
        onboardingCompleted: true,
      },
    });

    await prisma.user.createMany({
      data: TEST_NOTIFICATION_ADMIN_IDS.map((id, index) => ({
        id,
        email: `playwright-notification-${index}@example.test`,
        name: "Administrador de Notificações",
        admin: true,
        onboardingCompleted: true,
      })),
    });

    await prisma.user.createMany({
      data: TEST_PASSWORD_USERS.map(({ id, email }) => ({
        id,
        email,
        name: "Utilizador de Palavra-passe",
        passwordHash: bcrypt.hashSync(TEST_PASSWORD_USER_PASSWORD, 4),
        usedFreeTest: true,
        onboardingCompleted: true,
      })),
    });

    await prisma.user.createMany({
      data: TEST_GOOGLE_PASSWORD_USERS.map(({ id, email, googleId }) => ({
        id,
        email,
        googleId,
        name: "Utilizador Google",
        usedFreeTest: true,
        onboardingCompleted: true,
      })),
    });

    await prisma.user.create({
      data: {
        id: TEST_PAYMENT_USER_ID,
        email: TEST_PAYMENT_USER_EMAIL,
        name: "Utilizador de Pagamento",
        usedFreeTest: true,
        onboardingCompleted: true,
      },
    });

    await prisma.user.create({
      data: {
        id: TEST_EXAM_ADMIN_ID,
        email: "playwright-exam-admin@example.test",
        name: "Administrador de Exame",
        admin: true,
        onboardingCompleted: true,
      },
    });

    await prisma.user.create({
      data: {
        id: TEST_LAST_TEST_ADMIN_ID,
        email: "playwright-last-test-admin@example.test",
        name: "Administrador do Último Teste",
        admin: true,
        onboardingCompleted: true,
      },
    });

    await prisma.user.create({
      data: {
        id: TEST_FREE_USER_ID,
        email: "playwright-free-user@example.test",
        name: "Utilizador Gratuito",
        onboardingCompleted: true,
      },
    });

    await prisma.study.create({
      data: {
        id: TEST_STUDY_ID,
        title: "Estudo de Teste",
        questions: {
          create: [
            {
              id: "playwright-question",
              content: TEST_QUESTION,
              category: "Tema de Teste",
              options: {
                create: [
                  {
                    id: "playwright-option-a",
                    content: TEST_CORRECT_ANSWER,
                    letter: "A",
                    answer: true,
                  },
                  {
                    id: "playwright-option-b",
                    content: "Resposta incorreta B",
                    letter: "B",
                    answer: false,
                  },
                  {
                    id: "playwright-option-c",
                    content: "Resposta incorreta C",
                    letter: "C",
                    answer: false,
                  },
                  {
                    id: "playwright-option-d",
                    content: "Resposta incorreta D",
                    letter: "D",
                    answer: false,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    await prisma.study.create({
      data: {
        id: TEST_EXAM_STUDY_ID,
        title: "Estudo do Exame de Teste",
        questions: {
          create: TEST_EXAM_QUESTIONS.map((question) => ({
            id: question.id,
            content: question.content,
            category: "Tema de Exame de Teste",
            options: {
              create: [
                {
                  id: `${question.id}-option-a`,
                  content: question.correctAnswer,
                  letter: "A",
                  answer: true,
                },
                {
                  id: `${question.id}-option-b`,
                  content: question.incorrectAnswer,
                  letter: "B",
                  answer: false,
                },
                {
                  id: `${question.id}-option-c`,
                  content: `Outra resposta para ${question.content}`,
                  letter: "C",
                  answer: false,
                },
                {
                  id: `${question.id}-option-d`,
                  content: `Última resposta para ${question.content}`,
                  letter: "D",
                  answer: false,
                },
              ],
            },
          })),
        },
      },
    });

    await seedReadinessData(prisma);
    await seedFreeTrialStudy(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

// Created last so tests relying on the first study keep resolving to the others.
async function seedFreeTrialStudy(prisma: PrismaClient) {
  const freeQuestionsStart = Date.parse("2024-01-01T00:00:00.000Z");

  await prisma.study.create({
    data: {
      id: TEST_FREE_STUDY_ID,
      title: "Estudo Gratuito de Teste",
      questions: {
        create: Array.from({ length: TEST_FREE_QUESTION_TOTAL }, (_, index) => {
          const position = index + 1;
          const id = freeQuestionId(position);

          return {
            id,
            content: `Pergunta gratuita ${position}`,
            category: freeQuestionCategory(position),
            createdAt: new Date(freeQuestionsStart + position * 60_000),
            options: {
              create: [
                {
                  id: `${id}-option-a`,
                  content: "Resposta correta",
                  letter: "A" as const,
                  answer: true,
                },
                {
                  id: `${id}-option-b`,
                  content: "Resposta incorreta",
                  letter: "B" as const,
                  answer: false,
                },
              ],
            },
          };
        }),
      },
    },
  });
}

async function seedReadinessData(prisma: PrismaClient) {
  const examDate = new Date();
  examDate.setUTCDate(examDate.getUTCDate() + 10);
  examDate.setUTCHours(12, 0, 0, 0);

  const userBase = {
    admin: true,
    onboardingCompleted: true,
    weeklyTestGoal: 3,
    reminderTimezone: "Europe/Lisbon",
  };

  await prisma.user.create({
    data: {
      ...userBase,
      id: TEST_READINESS_USER_ID,
      email: "playwright-readiness@example.test",
      name: "Utilizador de Preparação",
      examDate,
    },
  });

  await prisma.user.create({
    data: {
      ...userBase,
      id: TEST_READINESS_EMPTY_USER_ID,
      email: "playwright-readiness-empty@example.test",
      name: "Utilizador sem Resultados",
    },
  });

  const questions = TEST_READINESS_CATEGORIES.flatMap((category) =>
    Array.from({ length: category.questions }, (_, index) => ({
      id: `playwright-readiness-${category.name}-${index + 1}`,
      content: `Pergunta ${index + 1} de ${category.name}`,
      category: category.name,
      answeredCorrectly: category.answeredCorrectly,
    })),
  );

  await prisma.study.create({
    data: {
      id: TEST_READINESS_STUDY_ID,
      title: "Estudo de Preparação",
      questions: {
        create: questions.map((question) => ({
          id: question.id,
          content: question.content,
          category: question.category,
          options: {
            create: [
              {
                id: `${question.id}-option-a`,
                content: "Resposta correta",
                letter: "A",
                answer: true,
              },
              {
                id: `${question.id}-option-b`,
                content: "Resposta incorreta",
                letter: "B",
                answer: false,
              },
            ],
          },
        })),
      },
    },
  });

  // Three test runs over the last hours, each answering the 10 questions of
  // the first two categories: 30 answers, half of them correct.
  const answered = questions.filter((q) => q.answeredCorrectly !== null);
  const now = Date.now();
  const results = Array.from({ length: TEST_READINESS_TEST_RUNS }).flatMap(
    (_, run) =>
      answered.map((question) => ({
        userId: TEST_READINESS_USER_ID,
        studyId: TEST_READINESS_STUDY_ID,
        questionId: question.id,
        optionId: `${question.id}-option-${question.answeredCorrectly ? "a" : "b"}`,
        testRunId: `playwright-readiness-run-${run + 1}`,
        createdAt: new Date(now - (TEST_READINESS_TEST_RUNS - run) * 3_600_000),
      })),
  );
  await prisma.testResult.createMany({ data: results });
}

setupTestDatabase().catch((error: unknown) => {
  console.error("Failed to prepare the Playwright test database.", error);
  process.exitCode = 1;
});

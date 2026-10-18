import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../app/generated/prisma/client";
import { execSync } from "node:child_process";
import {
  TEST_ADMIN_EMAIL,
  TEST_ADMIN_ID,
  TEST_CORRECT_ANSWER,
  TEST_EXAM_ADMIN_ID,
  TEST_EXAM_QUESTIONS,
  TEST_EXAM_STUDY_ID,
  TEST_PAYMENT_USER_EMAIL,
  TEST_PAYMENT_USER_ID,
  TEST_REGISTRATION_EMAILS,
  TEST_QUESTION,
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
      where: { id: { in: [TEST_STUDY_ID, TEST_EXAM_STUDY_ID] } },
    });
    await prisma.user.deleteMany({
      where: {
        id: { in: [TEST_ADMIN_ID, TEST_EXAM_ADMIN_ID, TEST_PAYMENT_USER_ID] },
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
      },
    });

    await prisma.user.create({
      data: {
        id: TEST_PAYMENT_USER_ID,
        email: TEST_PAYMENT_USER_EMAIL,
        name: "Utilizador de Pagamento",
        usedFreeTest: true,
      },
    });

    await prisma.user.create({
      data: {
        id: TEST_EXAM_ADMIN_ID,
        email: "playwright-exam-admin@example.test",
        name: "Administrador de Exame",
        admin: true,
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
  } finally {
    await prisma.$disconnect();
  }
}

setupTestDatabase().catch((error: unknown) => {
  console.error("Failed to prepare the Playwright test database.", error);
  process.exitCode = 1;
});

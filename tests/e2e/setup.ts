import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../app/generated/prisma/client";
import { execSync } from "node:child_process";
import {
  TEST_ADMIN_EMAIL,
  TEST_ADMIN_ID,
  TEST_CORRECT_ANSWER,
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

  execSync("npx prisma db push", {
    env,
    stdio: "inherit",
  });

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
  });

  try {
    await prisma.study.deleteMany({ where: { id: TEST_STUDY_ID } });
    await prisma.user.deleteMany({ where: { id: TEST_ADMIN_ID } });

    await prisma.user.create({
      data: {
        id: TEST_ADMIN_ID,
        email: TEST_ADMIN_EMAIL,
        name: "Utilizador de Teste",
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
  } finally {
    await prisma.$disconnect();
  }
}

setupTestDatabase().catch((error: unknown) => {
  console.error("Failed to prepare the Playwright test database.", error);
  process.exitCode = 1;
});

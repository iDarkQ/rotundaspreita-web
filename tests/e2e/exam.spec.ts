import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import {
  TEST_EXAM_ADMIN_ID,
  TEST_EXAM_QUESTIONS,
  TEST_EXAM_STUDY_ID,
} from "./test-constants";

const getExamQuestion = (content: string) => {
  const question = TEST_EXAM_QUESTIONS.find(
    (candidate) => candidate.content === content,
  );

  if (!question) {
    throw new Error(`Unexpected test exam question: ${content}`);
  }

  return question;
};

test("admin navigates an exam, confirms finishing, and sees the results", async ({
  page,
}) => {
  await authenticateUser(page, TEST_EXAM_ADMIN_ID);
  await page.addInitScript(() => {
    localStorage.setItem("lastTestimonial", "2099-01-01T00:00:00.000Z");
  });
  await page.goto(`/panel/${TEST_EXAM_STUDY_ID}`);
  await page.getByRole("link", { name: "Iniciar teste" }).click();

  const questionHeading = page.getByRole("heading", {
    level: 3,
    name: /^Pergunta .+ do exame de teste\.$/,
  });
  await expect(questionHeading).toBeVisible();

  const firstQuestionText = (await questionHeading.innerText()).trim();
  const firstQuestion = getExamQuestion(firstQuestionText);
  await page.getByText(firstQuestion.correctAnswer, { exact: true }).click();

  await expect(questionHeading).not.toHaveText(firstQuestionText);
  const secondQuestionText = (await questionHeading.innerText()).trim();
  const secondQuestion = getExamQuestion(secondQuestionText);

  await page.getByRole("button", { name: "Pergunta anterior" }).click();
  await expect(questionHeading).toHaveText(firstQuestionText);
  await page.getByRole("button", { name: "Próxima pergunta" }).click();
  await expect(questionHeading).toHaveText(secondQuestionText);

  await page.getByText(secondQuestion.incorrectAnswer, { exact: true }).click();
  await expect(questionHeading).not.toHaveText(secondQuestionText);
  const thirdQuestionText = (await questionHeading.innerText()).trim();
  getExamQuestion(thirdQuestionText);

  await page.getByRole("button", { name: "Pergunta anterior" }).click();
  await expect(questionHeading).toHaveText(secondQuestionText);
  await page.getByRole("button", { name: "Próxima pergunta" }).click();
  await expect(questionHeading).toHaveText(thirdQuestionText);

  await page.getByRole("button", { name: "Finalizar Teste" }).click();
  const confirmation = page.getByRole("dialog");
  await expect(
    confirmation.getByText(
      "Tem a certeza de que deseja terminar este teste? Ainda não respondeu a todas as perguntas.",
    ),
  ).toBeVisible();
  await confirmation.getByRole("button", { name: "Finalizar Teste" }).click();

  await expect(page.getByRole("heading", { name: "1/3" })).toBeVisible();
});

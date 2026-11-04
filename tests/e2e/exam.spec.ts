import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import {
  TEST_EXAM_ADMIN_ID,
  TEST_EXAM_QUESTIONS,
  TEST_EXAM_STUDY_ID,
} from "./test-constants";

const getExamQuestion = (id: string | null) => {
  const question = TEST_EXAM_QUESTIONS.find((candidate) => candidate.id === id);

  if (!question) {
    throw new Error(`Unexpected test exam question: ${id}`);
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

  const questionHeading = page.getByTestId("test-question");
  const currentQuestionId = () =>
    questionHeading.getAttribute("data-entity-id");
  const answer = (optionId: string) =>
    page.locator(`[data-entity-id="${optionId}"]`).click();
  await expect(questionHeading).toBeVisible();
  await expect(questionHeading).toHaveAttribute("data-entity-id", /.+/);

  const firstQuestion = getExamQuestion(await currentQuestionId());
  await answer(`${firstQuestion.id}-option-a`);

  await expect(questionHeading).not.toHaveAttribute(
    "data-entity-id",
    firstQuestion.id,
  );
  const secondQuestion = getExamQuestion(await currentQuestionId());

  await page.getByRole("button", { name: "Pergunta anterior" }).click();
  await expect(questionHeading).toHaveAttribute(
    "data-entity-id",
    firstQuestion.id,
  );
  await page.getByRole("button", { name: "Próxima pergunta" }).click();
  await expect(questionHeading).toHaveAttribute(
    "data-entity-id",
    secondQuestion.id,
  );

  await answer(`${secondQuestion.id}-option-b`);
  await expect(questionHeading).not.toHaveAttribute(
    "data-entity-id",
    secondQuestion.id,
  );
  const thirdQuestion = getExamQuestion(await currentQuestionId());

  await page.getByRole("button", { name: "Pergunta anterior" }).click();
  await expect(questionHeading).toHaveAttribute(
    "data-entity-id",
    secondQuestion.id,
  );
  await page.getByRole("button", { name: "Próxima pergunta" }).click();
  await expect(questionHeading).toHaveAttribute(
    "data-entity-id",
    thirdQuestion.id,
  );

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

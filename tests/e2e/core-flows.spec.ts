import { expect, test } from "@playwright/test";
import { authenticateAdmin } from "./auth";
import { TEST_CORRECT_ANSWER, TEST_QUESTION } from "./test-constants";

test("login form reports invalid credentials accessibly", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("missing-user@example.test");
  await page.getByPlaceholder("A sua palavra-passe").fill("invalid-password");
  await page.getByRole("button", { name: "Entrar com email" }).click();

  await expect(
    page.getByText(
      "Credenciais inválidas. Verifique o email e a palavra-passe.",
    ),
  ).toBeVisible();
});

test("admin starts a test, answers a question, and finishes it", async ({
  page,
}) => {
  await authenticateAdmin(page);
  await page.addInitScript(() => {
    localStorage.setItem("lastTestimonial", "2099-01-01T00:00:00.000Z");
  });
  await page.goto("/panel");

  await page.getByRole("link", { name: "Iniciar teste" }).click();
  await expect(page.getByText(TEST_QUESTION)).toBeVisible();
  await page.getByText(TEST_CORRECT_ANSWER).click();
  await page.getByRole("button", { name: "Finalizar Teste" }).click();
  await expect(
    page.getByRole("button", { name: "Faça Outro Teste" }),
  ).toBeVisible();
});

test("admin can open question creation and add an answer option", async ({
  page,
}) => {
  await authenticateAdmin(page);
  await page.goto("/questions");
  await page.getByRole("button", { name: "Criar Nova Pergunta" }).click();

  await expect(
    page.getByPlaceholder("Pergunta", { exact: true }),
  ).toBeVisible();

  const options = page.getByPlaceholder(
    "Clique e digite para escrever a resposta...",
  );
  await expect(options).toHaveCount(2);
  await page.getByRole("button", { name: "Adicionar Opção" }).click();
  await expect(options).toHaveCount(3);
});

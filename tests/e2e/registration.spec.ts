import { expect, test } from "@playwright/test";

test("visitor can correct an invalid email and register from the navbar", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  if (testInfo.project.name === "mobile-chromium") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
  }

  await page
    .getByRole("link")
    .filter({ hasText: /^Entrar$/, visible: true })
    .click();
  await expect(page).toHaveURL(/\/login$/);
  await page.getByRole("link", { name: "Criar conta com email" }).click();
  await expect(page).toHaveURL(/\/register$/);

  const name = "Utilizador";
  const lastName = "Playwright";
  const email = `playwright-registration-${testInfo.project.name}@example.test`;

  await page.getByLabel("Nome", { exact: true }).fill(name);
  await page.getByLabel("Apelido", { exact: true }).fill(lastName);
  await page.getByLabel("Email", { exact: true }).fill("email-invalido");
  await page
    .getByLabel("Palavra-passe", { exact: true })
    .fill("palavra-passe-segura");
  await page.getByRole("button", { name: "Registar", exact: true }).click();

  await expect(
    page.getByText("Não foi possível criar a conta. Verifique os dados."),
  ).toBeVisible();

  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByRole("button", { name: "Registar", exact: true }).click();

  await expect(page).toHaveURL(/\/onboarding$/);
  await expect(
    page.getByRole("heading", { name: `Olá, ${name}!` }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Começar" }).click();

  await expect(
    page.getByRole("heading", { name: "Quando é o seu exame?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(
    page.getByText("Indique a data do exame ou escolha"),
  ).toBeVisible();
  await page.getByRole("checkbox", { name: /Ainda não sei a data/ }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Quantos testes quer fazer por semana?",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Voltar ao passo anterior" }).click();
  await expect(
    page.getByRole("heading", { name: "Quando é o seu exame?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("radio", { name: /^5 testes/ }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(
    page.getByRole("heading", { name: "Quer receber lembretes?" }),
  ).toBeVisible();
  await page.getByRole("radio", { name: /^Agora não/ }).click();
  await page.getByRole("button", { name: "Concluir" }).click();

  await expect(
    page.getByRole("heading", { name: "Tudo pronto!" }),
  ).toBeVisible();
  await expect(page.getByText("Objetivo: 5 testes por semana")).toBeVisible();
  await page.getByRole("button", { name: "Ir para o painel" }).click();

  await expect(page).toHaveURL(/\/panel(?:\/)?$/);
  await expect(
    page.getByText(`Bem-vindo de volta, ${name} ${lastName}`),
  ).toBeVisible();
});

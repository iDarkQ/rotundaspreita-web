import { expect, Page, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import {
  TEST_GOOGLE_PASSWORD_USERS,
  TEST_PASSWORD_USER_PASSWORD,
  TEST_PASSWORD_USERS,
} from "./test-constants";

const NEW_PASSWORD = "palavra-passe-nova";
const SETUP_PASSWORD = "palavra-passe-google";

const openSettings = async (page: Page, projectName: string) => {
  await page.goto("/panel");
  await page.waitForLoadState("networkidle");

  if (projectName === "mobile-chromium") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
  }

  await page
    .getByRole("button", { name: "Definições do perfil" })
    .filter({ visible: true })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("tab", { name: "Perfil" }),
  ).toBeVisible();
};

test("user can change their password from the profile settings", async ({
  page,
}, testInfo) => {
  const user = testInfo.project.name.startsWith("mobile-")
    ? TEST_PASSWORD_USERS[1]
    : TEST_PASSWORD_USERS[0];
  await authenticateUser(page, user.id);
  await openSettings(page, testInfo.project.name);

  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText(user.email)).toBeVisible();

  const fill = async (current: string, next: string, confirm: string) => {
    await dialog.getByLabel("Palavra-passe atual").fill(current);
    await dialog.getByLabel("Nova palavra-passe", { exact: true }).fill(next);
    await dialog.getByLabel("Confirmar nova palavra-passe").fill(confirm);
    await dialog.getByRole("button", { name: "Guardar palavra-passe" }).click();
  };

  await fill(TEST_PASSWORD_USER_PASSWORD, "curta", "curta");
  await expect(dialog.getByRole("alert")).toContainText("pelo menos 8");

  await fill(TEST_PASSWORD_USER_PASSWORD, NEW_PASSWORD, "outra-palavra-passe");
  await expect(dialog.getByRole("alert")).toContainText("não coincidem");

  await fill("palavra-passe-errada", NEW_PASSWORD, NEW_PASSWORD);
  await expect(dialog.getByRole("alert")).toContainText("atual está incorreta");

  await fill(TEST_PASSWORD_USER_PASSWORD, NEW_PASSWORD, NEW_PASSWORD);
  await expect(dialog.getByRole("status")).toContainText(
    "Palavra-passe alterada com sucesso.",
  );

  await dialog.getByRole("tab", { name: "Subscrição" }).click();
  await expect(dialog.getByText("Não tem uma subscrição ativa")).toBeVisible();

  await page.context().clearCookies();
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  const login = async (password: string) => {
    await page.getByLabel("Email", { exact: true }).fill(user.email);
    await page.getByLabel("Palavra-passe", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Entrar com email" }).click();
  };

  await login(NEW_PASSWORD);
  await expect(page).not.toHaveURL(/\/login$/);
});

test("Google user can set a password and sign in with email", async ({
  page,
}, testInfo) => {
  const user = testInfo.project.name.startsWith("mobile-")
    ? TEST_GOOGLE_PASSWORD_USERS[1]
    : TEST_GOOGLE_PASSWORD_USERS[0];
  await authenticateUser(page, user.id);
  await openSettings(page, testInfo.project.name);

  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText(user.email)).toBeVisible();
  await expect(
    dialog.getByText(/Poderá continuar a utilizar o Google/),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Definir palavra-passe" }).click();

  await dialog.getByLabel("Nova palavra-passe").fill(SETUP_PASSWORD);
  await dialog.getByLabel("Confirmar palavra-passe").fill("diferente");
  await dialog.getByRole("button", { name: "Guardar palavra-passe" }).click();
  await expect(dialog.getByRole("alert")).toContainText("não coincidem");

  await dialog.getByLabel("Confirmar palavra-passe").fill(SETUP_PASSWORD);
  await dialog.getByRole("button", { name: "Guardar palavra-passe" }).click();
  await expect(dialog.getByText("Alterar palavra-passe")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Definições do perfil" })
    .filter({ visible: true })
    .click();
  await expect(
    page.getByRole("dialog").getByText("Alterar palavra-passe"),
  ).toBeVisible();

  await page.context().clearCookies();
  await page.goto("/login");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Email", { exact: true }).fill(user.email);
  await page.getByLabel("Palavra-passe", { exact: true }).fill(SETUP_PASSWORD);
  await page.getByRole("button", { name: "Entrar com email" }).click();
  await expect(page).not.toHaveURL(/\/login$/);
});

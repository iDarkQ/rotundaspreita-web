import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import {
  TEST_READINESS_EMPTY_USER_ID,
  TEST_READINESS_STUDY_ID,
  TEST_READINESS_USER_ID,
} from "./test-constants";

const panelUrl = `/panel/${TEST_READINESS_STUDY_ID}`;

test("panel shows the readiness score, countdown and explored areas", async ({
  page,
}) => {
  await authenticateUser(page, TEST_READINESS_USER_ID);
  await page.goto(panelUrl);

  // coverage 71% x 0.4 + accuracy 50% x 0.4 + consistency 25% x 0.2 = 53
  await expect(page.locator("main")).toContainText("53/100");
  await expect(page.getByText("A caminho", { exact: true })).toBeVisible();
  await expect(
    page.getByText("O exame está próximo. Concentre-se já em Mecânica."),
  ).toBeVisible();
  await expect(page.getByText(/^Faltam \d+ dias$/)).toBeVisible();

  const areas = page.getByRole("region", { name: "Áreas exploradas" });
  const area = (name: string) =>
    areas.getByRole("listitem").filter({ hasText: name });

  await expect(area("Sinalização")).toContainText("5/5 vistas");
  await expect(area("Sinalização")).toContainText("100% de acerto");
  await expect(area("Mecânica")).toContainText("0% de acerto");
  await expect(area("Legislação")).toContainText("0/4 vistas");
  await expect(area("Legislação")).toContainText("Por explorar");

  await expect(
    area("Sinalização").getByRole("link", { name: "Praticar esta área" }),
  ).toHaveCount(0);
});

test("practising a weak area starts a test in that category", async ({
  page,
}) => {
  await authenticateUser(page, TEST_READINESS_USER_ID);
  await page.goto(panelUrl);

  const practiceLink = page
    .getByRole("region", { name: "Áreas exploradas" })
    .getByRole("listitem")
    .filter({ hasText: "Mecânica" })
    .getByRole("link", { name: "Praticar esta área" });
  await expect(practiceLink).toHaveAttribute(
    "href",
    new RegExp(`s=${TEST_READINESS_STUDY_ID}&c=Mec%C3%A2nica&d=weak$`),
  );
  await practiceLink.click();

  await expect(page).toHaveURL(/\/test\?/);
  await expect(
    page.getByRole("heading", { level: 3, name: /de Mecânica$/ }),
  ).toBeVisible();
});

test("readiness score explains its coverage in a tooltip", async ({ page }) => {
  await authenticateUser(page, TEST_READINESS_USER_ID);
  await page.goto(panelUrl);

  await page.getByText("53/100").hover();
  await expect(
    page.getByRole("tooltip").filter({ hasText: "40% cobertura (71%)" }),
  ).toBeVisible();
});

test("a user without results sees the locked score and exam date prompt", async ({
  page,
}) => {
  await authenticateUser(page, TEST_READINESS_EMPTY_USER_ID);
  await page.goto(panelUrl);

  await expect(
    page.getByText(
      "Responda a mais 30 perguntas para desbloquear a sua pontuação.",
    ),
  ).toBeVisible();
  await expect(page.getByText("Defina a data do exame")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Definir data" }),
  ).toHaveAttribute("href", "/notifications");
  await expect(
    page.getByRole("link", { name: "Praticar esta área" }),
  ).toHaveCount(0);
});

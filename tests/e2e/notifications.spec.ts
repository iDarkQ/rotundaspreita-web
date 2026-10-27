import { expect, test } from "@playwright/test";
import { authenticateAdmin } from "./auth";

test("logged-in user can update weekly goals and reminder days", async ({
  page,
}) => {
  await authenticateAdmin(page);
  await page.goto("/notifications");

  await expect(
    page.getByRole("heading", { name: "Notificações e lembretes" }),
  ).toBeVisible();

  await page.getByLabel("Quantos testes quer fazer por semana?").fill("5");
  await page.getByRole("button", { name: "Ter", exact: true }).click();
  await page.getByRole("button", { name: "Guardar alterações" }).click();

  await expect(page.getByRole("status")).toContainText(
    "As preferências foram guardadas.",
  );
});

test("scheduled reminder endpoint rejects requests without its worker token", async ({
  request,
}) => {
  const response = await request.post("/api/internal/reminders");
  expect(response.status()).toBe(401);
});

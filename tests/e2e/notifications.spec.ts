import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import { TEST_NOTIFICATION_ADMIN_IDS } from "./test-constants";

test("logged-in user can update weekly goals and reminder days", async ({
  page,
}, testInfo) => {
  const notificationAdminId = testInfo.project.name.startsWith("mobile-")
    ? TEST_NOTIFICATION_ADMIN_IDS[1]
    : TEST_NOTIFICATION_ADMIN_IDS[0];
  await authenticateUser(page, notificationAdminId);
  await page.goto("/notifications");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("heading", { name: "Notificações e lembretes" }),
  ).toBeVisible();

  await page.getByLabel("Quantos testes quer fazer por semana?").fill("5");
  const tuesday = page.getByRole("button", { name: "Ter", exact: true });
  await tuesday.click();
  await expect(tuesday).toHaveAttribute("aria-pressed", "true");
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

import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import { TEST_EXAM_ADMIN_ID, TEST_EXAM_STUDY_ID } from "./test-constants";

test("the exam timer keeps running while the user moves between questions", async ({
  page,
}) => {
  await authenticateUser(page, TEST_EXAM_ADMIN_ID);
  await page.goto(`/panel/${TEST_EXAM_STUDY_ID}`);
  await page.getByRole("link", { name: "Iniciar teste" }).click();

  const timer = page.getByText(/^\d{1,2}:\d{2}$/).locator("visible=true");
  await expect(timer).toBeVisible();

  // Each navigation re-renders the test; the clock used to restart every time.
  for (let i = 0; i < 10; i++) {
    await page.getByRole("button", { name: "Próxima pergunta" }).click();
    await page.waitForTimeout(150);
    await page.getByRole("button", { name: "Pergunta anterior" }).click();
    await page.waitForTimeout(150);
  }

  const [minutes, seconds] = (await timer.innerText()).split(":").map(Number);
  const elapsedSeconds = 30 * 60 - (minutes * 60 + seconds);
  expect(elapsedSeconds).toBeGreaterThanOrEqual(2);
});

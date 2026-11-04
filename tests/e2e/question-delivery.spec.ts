import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import { TEST_FREE_STUDY_ID, TEST_FREE_USER_ID } from "./test-constants";

const questionTexts = (body: string) =>
  new Set(body.match(/Pergunta gratuita \d+/g));

test("each question is delivered on its own while a test is taken", async ({
  page,
}) => {
  await authenticateUser(page, TEST_FREE_USER_ID);
  await page.addInitScript(() => {
    localStorage.setItem("lastTestimonial", "2099-01-01T00:00:00.000Z");
  });

  const actionBodies: string[] = [];
  await page.route("**/test?*", async (route) => {
    if (route.request().method() !== "POST") return route.continue();

    const response = await route.fetch();
    actionBodies.push(await response.text());
    await route.fulfill({ response });
  });

  await page.goto(`/test?s=${TEST_FREE_STUDY_ID}&d=all&n=10`);
  const question = page.getByTestId("test-question");

  for (let step = 0; step < 3; step++) {
    await expect(question).toHaveAttribute("data-entity-id", /.+/);
    const id = (await question.getAttribute("data-entity-id"))!;
    await expect(async () => {
      await page.getByRole("button", { name: "Próxima pergunta" }).click();
      await expect(question).not.toHaveAttribute("data-entity-id", id, {
        timeout: 2_000,
      });
    }).toPass({ timeout: 20_000 });
  }
  await expect(question).toHaveAttribute("data-entity-id", /.+/);

  await page.unrouteAll({ behavior: "wait" });

  const withQuestions = actionBodies.filter(
    (body) => questionTexts(body).size > 0,
  );
  expect(withQuestions.length).toBeGreaterThan(0);
  for (const body of withQuestions) {
    expect(questionTexts(body).size).toBe(1);
  }
});

test("a question that cannot be loaded shows a message", async ({ page }) => {
  await authenticateUser(page, TEST_FREE_USER_ID);
  await page.addInitScript(() => {
    localStorage.setItem("lastTestimonial", "2099-01-01T00:00:00.000Z");
  });
  await page.route("**/test?*", (route) =>
    route.request().method() === "POST" ? route.abort() : route.continue(),
  );

  await page.goto(`/test?s=${TEST_FREE_STUDY_ID}&d=all&n=10`);

  const loadError = page.getByText("Não foi possível carregar a pergunta");
  await expect(page.getByTestId("test-question")).toHaveAttribute(
    "data-entity-id",
    /.+/,
  );
  await expect(loadError).toHaveCount(0);

  await expect(async () => {
    await page.getByRole("button", { name: "Próxima pergunta" }).click();
    await expect(loadError).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 20_000 });
});

import { expect, test, type Page } from "@playwright/test";
import { authenticateUser } from "./auth";
import {
  TEST_FREE_STUDY_ID,
  TEST_FREE_USER_ID,
  freeQuestionCategory,
  freeQuestionId,
} from "./test-constants";

const collectQuestionIds = async (page: Page, count: number) => {
  const question = page.getByTestId("test-question");
  const ids: string[] = [];

  for (let index = 0; index < count; index++) {
    await expect(question).toHaveAttribute("data-entity-id", /.+/);
    const id = (await question.getAttribute("data-entity-id"))!;
    ids.push(id);

    if (index < count - 1) {
      // The first clicks can land before hydration, so retry until it advances.
      await expect(async () => {
        await page.getByRole("button", { name: "Próxima pergunta" }).click();
        await expect(question).not.toHaveAttribute("data-entity-id", id, {
          timeout: 2_000,
        });
      }).toPass({ timeout: 20_000 });
    }
  }

  await expect(
    page.getByRole("button", { name: "Próxima pergunta" }),
  ).toBeDisabled();

  return ids.sort();
};

const oldestPositions = (count: number, category?: string) =>
  Array.from({ length: 60 }, (_, index) => index + 1)
    .filter(
      (position) => !category || freeQuestionCategory(position) === category,
    )
    .slice(0, count)
    .map(freeQuestionId)
    .sort();

test("free accounts always receive the same oldest questions", async ({
  page,
}) => {
  await authenticateUser(page, TEST_FREE_USER_ID);
  await page.addInitScript(() => {
    localStorage.setItem("lastTestimonial", "2099-01-01T00:00:00.000Z");
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    await page.goto(`/test?s=${TEST_FREE_STUDY_ID}&d=all&n=10`);
    expect(await collectQuestionIds(page, 10)).toEqual(oldestPositions(10));
  }

  await page.goto(`/test?s=${TEST_FREE_STUDY_ID}&d=all&n=20`);
  expect(await collectQuestionIds(page, 20)).toEqual(oldestPositions(20));
});

test("free accounts get the oldest questions of the chosen category", async ({
  page,
}) => {
  await authenticateUser(page, TEST_FREE_USER_ID);
  await page.addInitScript(() => {
    localStorage.setItem("lastTestimonial", "2099-01-01T00:00:00.000Z");
  });

  await page.goto(
    `/test?s=${TEST_FREE_STUDY_ID}&d=all&n=10&c=${encodeURIComponent("Livre B")}`,
  );
  expect(await collectQuestionIds(page, 10)).toEqual(
    oldestPositions(10, "Livre B"),
  );
});

import { expect, test } from "@playwright/test";
import { Client } from "pg";
import { authenticateUser } from "./auth";
import {
  TEST_EXAM_ADMIN_ID,
  TEST_EXAM_QUESTIONS,
  TEST_EXAM_STUDY_ID,
  TEST_LAST_TEST_ADMIN_ID,
} from "./test-constants";

const panelUrl = `/panel/${TEST_EXAM_STUDY_ID}`;
const timer = (page: import("@playwright/test").Page) =>
  page.getByText(/^\d{1,2}:\d{2}$/).locator("visible=true");

test("the panel remembers the chosen test length and the timer follows it", async ({
  page,
}) => {
  await authenticateUser(page, TEST_EXAM_ADMIN_ID);
  await page.goto(panelUrl);

  const collapsedWidth = (
    await page.getByRole("link", { name: "Iniciar teste" }).boundingBox()
  )?.width;

  await page.getByRole("button", { name: "Definições do teste" }).click();
  const slider = page.getByRole("slider", { name: "Número de perguntas" });
  await expect(slider).toBeVisible();
  const settingsPanel = page.getByTestId("test-question-count-panel");
  const panelBounds = await settingsPanel.boundingBox();
  const finalStopBounds = await page
    .getByTestId("test-question-count-stop-100")
    .boundingBox();
  expect(panelBounds).not.toBeNull();
  expect(finalStopBounds).not.toBeNull();
  expect(
    panelBounds!.y +
      panelBounds!.height -
      (finalStopBounds!.y + finalStopBounds!.height),
  ).toBeGreaterThanOrEqual(32);

  // Opening the settings must never resize the surrounding menu card.
  const startLink = page.getByRole("link", { name: "Iniciar teste" });
  expect((await startLink.boundingBox())?.width).toBe(collapsedWidth);

  await expect(slider).toHaveAttribute("min", "0");
  await expect(slider).toHaveAttribute("max", "4");
  await expect(slider).toHaveAttribute(
    "aria-valuetext",
    "30 perguntas, 30 minutos",
  );
  await expect(page.getByText("Recomendado")).toBeVisible();
  const sliderBounds = await page
    .getByTestId("test-question-count-slider")
    .boundingBox();
  expect(sliderBounds).not.toBeNull();
  for (const [index, questionCount] of [10, 20, 30, 50, 100].entries()) {
    const stop = await page
      .getByTestId(`test-question-count-stop-${questionCount}`)
      .boundingBox();
    expect(stop).not.toBeNull();
    const expectedCenter = sliderBounds!.x + (sliderBounds!.width * index) / 4;
    expect(Math.abs(stop!.x - expectedCenter)).toBeLessThanOrEqual(1);
  }

  await slider.fill("0");
  await expect(slider).toHaveAttribute(
    "aria-valuetext",
    "10 perguntas, 10 minutos",
  );
  await expect(page.getByText("Recomendado")).toBeHidden();

  await page.reload();
  await page.getByRole("button", { name: "Definições do teste" }).click();
  await expect(
    page.getByRole("heading", { name: "Iniciar novo teste de 10 minutos" }),
  ).toBeVisible();
  await expect(slider).toHaveAttribute(
    "aria-valuetext",
    "10 perguntas, 10 minutos",
  );

  await page.getByRole("link", { name: "Iniciar teste" }).click();
  await expect(page).toHaveURL(/[?&]n=10(&|$)/);
  await expect(timer(page)).toHaveText(/^(10:00|9:5\d)$/);
});

test("choosing 100 questions does not widen the test menu", async ({
  page,
}) => {
  await authenticateUser(page, TEST_EXAM_ADMIN_ID);
  await page.goto(panelUrl);

  const startLink = page.getByRole("link", { name: "Iniciar teste" });
  const collapsedWidth = (await startLink.boundingBox())?.width;
  await page.getByRole("button", { name: "Definições do teste" }).click();

  const slider = page.getByRole("slider", { name: "Número de perguntas" });
  await slider.fill("3");
  await expect(
    page.getByRole("heading", { name: "Iniciar novo teste de 50 minutos" }),
  ).toBeVisible();
  await slider.fill("4");
  await expect(slider).toHaveAttribute(
    "aria-valuetext",
    "100 perguntas, 100 minutos",
  );
  const hundredMinuteHeading = page.getByRole("heading", {
    name: "Iniciar novo teste de 100 minutos",
  });
  await expect(hundredMinuteHeading).toBeVisible();
  expect((await startLink.boundingBox())?.width).toBe(collapsedWidth);
  await expect(page.getByTestId("test-question-count-thumb")).toHaveClass(
    /transition-\[left\]/,
  );
  await expect(page.getByTestId("test-question-count-tick")).toHaveCount(5);
});

test("the last-test question list shows every question from the latest run", async ({
  page,
}) => {
  const databaseUrl = process.env.PLAYWRIGHT_DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("PLAYWRIGHT_DATABASE_URL is required for this test.");
  }

  const database = new Client({ connectionString: databaseUrl });
  await database.connect();
  const latestRunId = `playwright-last-test-${Date.now()}`;
  const previousRunId = `${latestRunId}-previous`;
  const shortRunId = `${latestRunId}-short`;
  const now = Date.now();
  const createTestResults = (
    testRunId: string,
    count: number,
    createdAtOffset: number,
  ) =>
    Array.from({ length: count }, (_, index) => {
      const question = TEST_EXAM_QUESTIONS[index % TEST_EXAM_QUESTIONS.length];
      return {
        userId: TEST_LAST_TEST_ADMIN_ID,
        studyId: TEST_EXAM_STUDY_ID,
        questionId: question.id,
        optionId: `${question.id}-option-a`,
        testRunId,
        createdAt: new Date(now + createdAtOffset + index),
      };
    });
  const insertTestResults = async (
    results: ReturnType<typeof createTestResults>,
  ) => {
    const values: (string | Date)[] = [];
    const rows = results.map((result, index) => {
      const offset = index * 7;
      values.push(
        `${result.testRunId}-${index}`,
        result.createdAt,
        result.questionId,
        result.optionId,
        result.userId,
        result.studyId,
        result.testRunId,
      );
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`;
    });

    await database.query(
      `INSERT INTO "TestResult" ("id", "createdAt", "questionId", "optionId", "userId", "studyId", "testRunId") VALUES ${rows.join(", ")}`,
      values,
    );
  };

  try {
    await insertTestResults([
      ...createTestResults(previousRunId, 8, -10_000),
      ...createTestResults(latestRunId, 50, 0),
    ]);
    await authenticateUser(page, TEST_LAST_TEST_ADMIN_ID);
    await page.goto(panelUrl);

    const listHeading = page.getByRole("heading", {
      name: "Perguntas do último teste",
    });
    const listCard = listHeading.locator("xpath=../..");
    await expect(listCard.getByRole("listitem")).toHaveCount(50);
    await expect(listCard.getByText("50 questões")).toBeVisible();

    await insertTestResults(createTestResults(shortRunId, 10, 1_000));
    await page.reload();
    await expect(listCard.getByRole("listitem")).toHaveCount(10);
    await expect(listCard.getByText("10 questões")).toBeVisible();
  } finally {
    await database.query(
      'DELETE FROM "TestResult" WHERE "userId" = $1 AND "testRunId" = ANY($2::text[])',
      [TEST_LAST_TEST_ADMIN_ID, [latestRunId, previousRunId, shortRunId]],
    );
    await database.end();
  }
});

test("the server ignores test lengths outside the allowed options", async ({
  page,
}) => {
  await authenticateUser(page, TEST_EXAM_ADMIN_ID);

  for (const length of ["7", "9999", "30.5", "1e2", "0"]) {
    await page.goto(`/test?s=${TEST_EXAM_STUDY_ID}&d=all&n=${length}`);
    await expect(timer(page)).toHaveText(/^(30:00|29:5\d)$/);
  }
});

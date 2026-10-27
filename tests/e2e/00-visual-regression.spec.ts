import { expect, test } from "@playwright/test";
import { authenticateAdmin } from "./auth";
import { TEST_ADMIN_ID, TEST_STUDY_ID } from "./test-constants";
import { Client } from "pg";

const clearAdminTestResults = async () => {
  const databaseUrl = process.env.PLAYWRIGHT_DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("PLAYWRIGHT_DATABASE_URL is required for visual tests.");
  }

  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    await client.query('DELETE FROM "TestResult" WHERE "userId" = $1', [
      TEST_ADMIN_ID,
    ]);
  } finally {
    await client.end();
  }
};

const visualScreens = [
  { name: "home", path: "/" },
  { name: "login", path: "/login" },
  { name: "faq", path: "/faq" },
  { name: "panel", path: "/panel", authenticated: true, maskCharts: true },
  {
    name: "test-in-progress",
    path: `/test?s=${TEST_STUDY_ID}&d=all`,
    authenticated: true,
    maskTimer: true,
  },
  { name: "question-library", path: "/questions", authenticated: true },
];

for (const screen of visualScreens) {
  test(`${screen.name} visual baseline`, async ({ page }, testInfo) => {
    if (screen.authenticated) {
      await authenticateAdmin(page);
    }

    if (screen.name === "panel") {
      await clearAdminTestResults();
    }

    await page.goto(screen.path);
    await expect(page.locator("main")).toBeVisible();
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const masks = [];
    if ("maskCharts" in screen && screen.maskCharts) {
      masks.push(page.locator("canvas"));
    }
    if ("maskTimer" in screen && screen.maskTimer) {
      masks.push(page.getByText(/^\d{1,2}:\d{2}$/));
    }

    await expect(page).toHaveScreenshot(`${screen.name}.png`, {
      fullPage:
        screen.name !== "home" || testInfo.project.name === "desktop-chromium",
      animations: "disabled",
      caret: "hide",
      mask: masks,
    });
  });
}

import { defineConfig } from "@playwright/test";
import { TEST_JWT_SECRET } from "./tests/e2e/test-constants";

const testDatabaseUrl = process.env.PLAYWRIGHT_DATABASE_URL;

if (!testDatabaseUrl) {
  throw new Error(
    "Set PLAYWRIGHT_DATABASE_URL to a dedicated PostgreSQL test database before running Playwright.",
  );
}

const databaseName = decodeURIComponent(new URL(testDatabaseUrl).pathname)
  .replace(/^\/+/, "")
  .split("/")[0];

if (!/(^|[-_])test($|[-_])/i.test(databaseName)) {
  throw new Error(
    "PLAYWRIGHT_DATABASE_URL must point to a database whose name contains a separate 'test' segment.",
  );
}

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.03,
      threshold: 0.2,
    },
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  outputDir: "test-results",
  projects: [
    {
      name: "desktop-chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 960 },
      },
    },
    {
      name: "mobile-chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  use: {
    baseURL: "http://127.0.0.1:3100",
    locale: "pt-PT",
    timezoneId: "Europe/Lisbon",
    colorScheme: "light",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run test:e2e:server",
    url: "http://127.0.0.1:3100/login",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      DATABASE_URL: testDatabaseUrl,
      JWT_SECRET: TEST_JWT_SECRET,
      STRIPE_PRIVATE_KEY: "sk_test_playwright_placeholder",
      NEXT_PUBLIC_GOOGLE_CLIENT_ID:
        "playwright-test-client-id.apps.googleusercontent.com",
      NEXT_PUBLIC_TEST_LENGTH: "30",
      NEXT_PUBLIC_POSTHOG_KEY: "",
      NEXT_PUBLIC_POSTHOG_HOST: "",
      PLAYWRIGHT_STRIPE_MOCK: "true",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});

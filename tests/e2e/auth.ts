import type { Page } from "@playwright/test";
import jwt from "jsonwebtoken";
import {
  TEST_ADMIN_ID,
  TEST_BASE_URL,
  TEST_JWT_SECRET,
} from "./test-constants";

export async function authenticateAdmin(page: Page) {
  await page.context().addCookies([
    {
      name: "secret",
      value: jwt.sign({ id: TEST_ADMIN_ID }, TEST_JWT_SECRET, {
        expiresIn: "1h",
      }),
      url: TEST_BASE_URL,
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
}

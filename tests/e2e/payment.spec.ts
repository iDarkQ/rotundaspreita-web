import { expect, test } from "@playwright/test";
import { authenticateUser } from "./auth";
import { TEST_PAYMENT_USER_ID } from "./test-constants";

test("unsubscribed user can open the mocked Stripe checkout", async ({
  page,
}) => {
  await authenticateUser(page, TEST_PAYMENT_USER_ID);
  await page.context().route("https://checkout.stripe.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: `<!doctype html>
        <html lang="pt">
          <head><title>Checkout de Teste Stripe</title></head>
          <body>
            <main>
              <h1>Checkout de Teste Stripe</h1>
              <button
                type="button"
                onclick="document.querySelector('#payment-status').textContent = 'Pagamento de teste concluído.'"
              >Concluir pagamento de teste</button>
              <p id="payment-status" aria-live="polite"></p>
            </main>
          </body>
        </html>`,
    }),
  );

  await page.goto("/panel");
  const checkoutPopup = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Renovar Subscrição" }).click();
  const checkoutPage = await checkoutPopup;

  await expect(checkoutPage).toHaveURL(
    new RegExp(
      `^https://checkout\\.stripe\\.com/c/pay/cs_test_playwright_${TEST_PAYMENT_USER_ID}$`,
    ),
  );
  await expect(
    checkoutPage.getByRole("heading", { name: "Checkout de Teste Stripe" }),
  ).toBeVisible();
  await checkoutPage
    .getByRole("button", { name: "Concluir pagamento de teste" })
    .click();
  await expect(
    checkoutPage.getByText("Pagamento de teste concluído."),
  ).toBeVisible();
});

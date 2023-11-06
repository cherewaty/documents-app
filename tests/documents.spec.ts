import { test, expect } from "@playwright/test";

test("navigates to new document form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Documents" })).toBeVisible();
  await page.locator("[aria-label='New document']").click();
  await expect(
    page.getByRole("heading", { name: "New document" })
  ).toBeVisible();
});

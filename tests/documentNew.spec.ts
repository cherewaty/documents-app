import { test, expect } from "@playwright/test";

test("fails to create a requisition", async ({ page }) => {
  await page.goto("/documents/new");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByText("description is a required field")).toBeVisible();
  await expect(page.getByText("amount must be greater than 0")).toBeVisible();
});

test("successfully creates a requisition less than $1000", async ({ page }) => {
  await page.goto("/documents/new");

  await page.getByLabel("Type").click();
  await page.getByRole("option", { name: "Requisition" }).click();
  await page.getByLabel("Description").fill("This is a small requisition");
  await page.getByLabel("Amount").fill("100");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(
    page.getByRole("heading", { name: "REQUISITION" })
  ).toBeVisible();
  await expect(page.getByText("Awaiting review from Manager")).toBeVisible();
});

test("successfully creates a requisition over $1000", async ({ page }) => {
  await page.goto("/documents/new");

  await page.getByLabel("Type").click();
  await page.getByRole("option", { name: "Requisition" }).click();
  await page.getByLabel("Description").fill("This is a large requisition");
  await page.getByLabel("Amount").fill("10000");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(
    page.getByRole("heading", { name: "REQUISITION" })
  ).toBeVisible();
  await expect(page.getByText("Awaiting review from CEO")).toBeVisible();
});

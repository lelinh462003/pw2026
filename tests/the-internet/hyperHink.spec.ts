import { expect, test } from "@playwright/test";

test("HyperHink", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/status_codes");
    // 200
    await page.getByRole("link", { name: "200" }).click();
    await expect(page.getByRole("heading", { name: "Status Codes" })).toBeVisible();
    await expect(page.getByRole("paragraph")).toContainText(
        "This page returned a 200 status code. For a definition and common list of HTTP status codes, go here",
    );
    await page.getByRole("link", { name: "here" }).click();

    // 301
    await page.getByRole("link", { name: "301" }).click();
    await expect(page.getByRole("heading", { name: "Status Codes" })).toBeVisible();
    await expect(page.getByRole("paragraph")).toContainText(
        "This page returned a 301 status code. For a definition and common list of HTTP status codes, go here",
    );
    await page.getByRole("link", { name: "here" }).click();

    // 404
    await page.getByRole("link", { name: "404" }).click();
    await expect(page.getByRole("heading", { name: "Status Codes" })).toBeVisible();
    await expect(page.getByRole("paragraph")).toContainText(
        "This page returned a 404 status code. For a definition and common list of HTTP status codes, go here",
    );
    await page.getByRole("link", { name: "here" }).click();

    // 500
    await page.getByRole("link", { name: "500" }).click();
    await expect(page.getByRole("heading", { name: "Status Codes" })).toBeVisible();
    await expect(page.getByRole("paragraph")).toContainText(
        "This page returned a 500 status code. For a definition and common list of HTTP status codes, go here",
    );
});

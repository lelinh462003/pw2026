import { test, expect } from "@playwright/test";

test("TC08: Hover - Hover over element", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers");

    const figure = page.locator(".figure").first();
    await figure.hover();

    await expect(figure.locator("h5")).toHaveText("name: user1");
});

test("hover test", async ({ page }) => {
    //go to the dropdown page
    await page.goto("/hovers");

    await page.locator("div.figure").nth(0).hover();
    await expect(page.locator("div.figure").nth(0).locator("h5")).toBeVisible();
});

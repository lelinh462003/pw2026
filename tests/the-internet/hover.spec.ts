import { test, expect } from "@playwright/test";

test("TC08: Hover - Hover over element", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers");

    const figure = page.locator(".figure").first();
    await figure.hover();

    await expect(figure.locator("h5")).toHaveText("name: user1");
});

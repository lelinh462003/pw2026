import { test, expect } from "@playwright/test";

test("Handle Dynamic loading page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");

    await page.getByRole("button", { name: "Start" }).click();

    await expect(page.locator("#finish h4")).toHaveText("Hello World!");
});

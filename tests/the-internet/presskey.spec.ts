import { test, expect } from "@playwright/test";

test("key press", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/key_presses");

    await page.keyboard.press("Escape");

    await expect(page.locator("#result")).toHaveText("You entered: ESCAPE");
});

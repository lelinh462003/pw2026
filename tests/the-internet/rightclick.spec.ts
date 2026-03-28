import { test, expect } from "@playwright/test";

test("context click", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/context_menu");

    await page.locator("#hot-spot").click({
        button: "right",
    });
});

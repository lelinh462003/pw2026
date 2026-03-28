import { test } from "@playwright/test";

test("capture screenshot", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/context_menu");

    await page.screenshot({
        path: "screenshot-context-menu.png",
    });
});

/**
 * 1 mở browser
2 mở website
3 chụp screenshot
4 lưu file vào project
 */

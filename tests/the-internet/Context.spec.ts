import { test } from "@playwright/test";

test("TC09: Right click - Context menu", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/context_menu");
    await page.locator("#hot-spot").click({ button: "right" });
    page.on("dialog", (dialog) => dialog.accept());
});

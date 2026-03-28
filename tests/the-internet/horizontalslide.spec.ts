import { test, expect } from "@playwright/test";

test("horizontal slider", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/horizontal_slider");

    const slider = page.locator(".sliderContainer input");

    for (let i = 0; i < 10; i++) {
        await slider.press("ArrowRight");
    }

    await expect(page.locator("#range")).toHaveText("5");
});

import { test, expect } from "@playwright/test";

test("TC06: Frame - Nested frames", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/nested_frames");

    // LEFT
    const leftFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-left"]');

    await expect(leftFrame.locator("body")).toHaveText("LEFT");

    // await expect(page.locator('frame[name="frame-top"]').contentFrame().locator('frame[name="frame-left"]').contentFrame().locator('body')).toContainText('LEFT');

    // RIGHT
    const rightFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-right"]');

    await expect(rightFrame.locator("body")).toHaveText("RIGHT");

    // MIDDLE
    const middleFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]');

    await expect(middleFrame.locator("#content")).toHaveText("MIDDLE");

    // BOTTOM (cái này đúng vì nó là con trực tiếp của page)
    const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');

    await expect(bottomFrame.locator("body")).toHaveText("BOTTOM");
});

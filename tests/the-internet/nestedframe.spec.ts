import { expect, test } from "@playwright/test";

test("Nested Frame Test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/nested_frames");

    //LEFT
    const leftFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-left"]');
    await expect(leftFrame.locator("body")).toContainText("LEFT");

    //MIDDLE
    const middleFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-middle"]');
    await expect(middleFrame.locator("#content")).toContainText("MIDDLE");

    //RIGHT
    const rightFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-right"]');
    await expect(rightFrame.locator("body")).toContainText("RIGHT");

    //BOTTOM
    const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
    await expect(bottomFrame.locator("body")).toContainText("BOTTOM");
});

import { test, expect } from "@playwright/test";
test("TC07: Alert - JS Alert", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on("dialog", (dialog) => dialog.accept());
    // Click button to trigger alert
    await page.getByRole("button", { name: "Click for JS Alert" }).click();
    // Verify result text after accepting
    await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");
});

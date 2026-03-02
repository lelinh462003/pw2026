import { test, expect } from "@playwright/test";

test("Checkboxes", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    //await page.pause(); // sẽ dừng tại đây
    await page.getByRole("checkbox").first().check();
    expect(await page.getByRole("checkbox").first()).toBeChecked();
    await page.getByRole("checkbox").nth(1).check();
    expect(await page.getByRole("checkbox").nth(1)).toBeChecked();
});

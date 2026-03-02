import { expect, test } from "@playwright/test";

test("DropDown", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator("#dropdown").selectOption({ label: "Option 1" });
    //await page.getByRole("combobox").selectOption("Option 1");
    await expect(page.locator("#dropdown")).toHaveValue("1");
});

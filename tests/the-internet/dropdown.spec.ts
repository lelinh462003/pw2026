import { expect, test } from "@playwright/test";

test("DropDown", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator("#dropdown").selectOption({ label: "Option 1" });
    // await page.getByRole("combobox").selectOption("Option 1");
    await expect(page.locator("#dropdown")).toHaveValue("1");
    await expect(page.locator(`#dropdown > option:checked`)).toHaveText("Option 1");
});

test("DropDown with multiple options", async ({ page }) => {
    await page.goto("https://output.jsbin.com/osebed/2");

    await page.locator("#fruits").selectOption(["apple", "banana"]);
    await expect(page.locator("#fruits > option:checked")).toHaveText(["Banana", "Apple"]);

    await page.locator("#fruits").selectOption([]);
    await expect(page.locator("#fruits > option:checked")).toHaveText([]);
});

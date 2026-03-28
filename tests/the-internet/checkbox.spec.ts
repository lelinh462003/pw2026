import { test, expect } from "../fixtures/the-internet.fixture";

test("Checkboxes", async ({ checkboxesPage }) => {
    await checkboxesPage.goto();
    //await page.pause(); // sẽ dừng tại đây
    await checkboxesPage.checkFirstCheckbox(); //accessibility
    // await page.locator("#checkboxes input:nth-child(1)").check(); //css
    await checkboxesPage.checkSecondCheckbox(); //xpath

    expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);
    expect(await checkboxesPage.isSecondCheckboxChecked).toBe(true);
});

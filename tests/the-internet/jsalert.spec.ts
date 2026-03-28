import { expect, test } from "@playwright/test";

test.describe("js", async () => {
    test.beforeEach("", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

    test("js alert", async ({ page }) => {
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toEqual("I am a JS Alert");
            await dialog.accept();
        });

        await page.getByRole("button", { name: "Click for JS Alert" }).click();

        await expect(page.getByText("You successfully clicked an alert")).toBeVisible();
    });

    test("js confirm => cancel", async ({ page }) => {
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toEqual("I am a JS Confirm");
            await dialog.dismiss(); //cancel
        });

        await page.getByRole("button", { name: "Click for JS Confirm" }).click();

        await expect(page.getByText("You clicked: Cancel")).toBeVisible();
    });

    test("js confirm => OK", async ({ page }) => {
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toEqual("I am a JS Confirm");
            await dialog.accept();
        });

        await page.getByRole("button", { name: "Click for JS Confirm" }).click();

        await expect(page.getByText("You clicked: Ok")).toBeVisible();
    });

    test("js prompt => OK", async ({ page }) => {
        page.on("dialog", async (dialog) => {
            expect(dialog.message()).toEqual("I am a JS prompt");
            await dialog.accept("hello World");
        });
        await page.getByRole("button", { name: "Click for JS Prompt" }).click();
        //await expect(page.getByText("You clicked: Ok")).toBeVisible();
        await expect(page.getByText("You entered: hello World")).toBeVisible();
    });
});

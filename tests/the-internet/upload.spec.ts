import { test, expect } from "@playwright/test";

test("upload a file", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");

    const filePath = "tests/resources/upload/bb.txt";
    await page.setInputFiles("input#file-upload", filePath);

    await page.getByRole("button", { name: "Upload" }).click();
    await expect(page.locator("#uploaded-files")).toContainText("bb.txt");
});

test("upload multiple file", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");

    const filePath = ["tests/resources/upload/bb.txt", "tests/resources/upload/aa.txt"];
    await page.setInputFiles("input#file-upload", filePath);

    await page.getByRole("button", { name: "Upload" }).click();
    await expect(page.locator("#uploaded-files")).toContainText(["bb.txt", "aa.txt"]);
});

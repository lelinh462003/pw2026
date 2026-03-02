import { test, expect } from "@playwright/test";

// Test case = fix(Arrange, Act, Assert)
test("should successfully login with valid credentials", async ({ page }) => {
    //arrange
    await page.goto("https://the-internet.herokuapp.com/login");
    //actions
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page.getByRole("textbox", { name: "Password" }).fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    //assertions
    await expect(page.getByText("You logged into a secure area")).toBeVisible();
    await expect(page.locator("h4")).toContainText("Welcome to the Secure Area. When you are done click logout below.");
});

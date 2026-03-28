// import { test, expect } from "@playwright/test";
//import { LoginPage } from "../pages/login.page";
import { test, expect } from "../fixtures/the-internet.fixture";

test("Username and Password is correct", async ({ loginPage }) => {
    //const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("tomsmith", "SuperSecretPassword!");

    await expect(await loginPage.getSuccessFlashMessage()).toContainText("You logged into a secure area");

    await expect(await loginPage.getWelcomeMessage()).toContainText(
        "Welcome to the Secure Area. When you are done click logout below.",
    );
});

// import { test as base, expect } from "@playwright/test";
// import { LoginPage } from "../pages/login.page";

// type TheInternetFixture = {
//     loginPage: LoginPage;
// };

// export const test = base.extend<TheInternetFixture>({
//     loginPage: async ({ page }, use) => {
//         const loginPage = new LoginPage(page);
//         await use(loginPage);
//     },
// });

// export {expect} from '@playwright/test';

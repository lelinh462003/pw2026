import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { CheckboxesPage } from "../pages/checkboxes.page";
import { TablePage } from "../pages/table.page";

type TheInternetFixture = {
    loginPage: LoginPage;
    checkboxesPage: CheckboxesPage;
    tablePage: TablePage;
};

export const test = base.extend<TheInternetFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    checkboxesPage: async ({ page }, use) => {
        const checkboxesPage = new CheckboxesPage(page);
        await use(checkboxesPage);
    },

    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await use(tablePage);
    },
});

export { expect };

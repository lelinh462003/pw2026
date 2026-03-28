import { expect, type Location, type Page } from "@playwright/test";

export class CheckboxesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://the-internet.herokuapp.com/checkboxes");
    }

    get firstCheckbox() {
        return this.page.getByRole("checkbox").first();
    }

    get secondCheckbox() {
        return this.page.getByRole("checkbox").nth(1);
    }

    async checkFirstCheckbox() {
        await this.page.getByRole("checkbox").first().check();
    }

    async checkSecondCheckbox() {
        await this.page.getByRole("checkbox").nth(1).check();
    }

    async isFirstCheckboxChecked() {
        return await this.page.getByRole("checkbox").first().isChecked();
    }

    async isSecondCheckboxChecked() {
        return await this.page.getByRole("checkbox").nth(1).isChecked();
    }
}

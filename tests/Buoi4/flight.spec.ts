import { test, expect } from "@playwright/test";

test("Verify search flight SGN → HAN with correct dates", async ({ page }) => {
    await page.goto("https://www.vietnamairlines.com/vn/vi/");

    // Accept cookie
    await page.getByRole("button", { name: /đồng ý/i }).click();

    // ===== Step 1: Chọn điểm đi / đến =====
    await page.getByRole("textbox", { name: /điểm đi/i }).click();
    await page.getByRole("option", { name: /hồ chí minh.*sgn/i }).click();

    await page.getByRole("textbox", { name: /điểm đến/i }).click();
    await page.getByRole("option", { name: /hà nội.*han/i }).click();

    // ===== Step 2: Chọn ngày đi =====
    const departInput = page.getByRole("textbox", { name: /ngày đi/i });
    await departInput.click();

    // chọn 25/03/2026
    await page.locator("table").locator("a", { hasText: "25" }).first().click();

    // ===== Step 3: Chọn ngày về =====
    const returnInput = page.getByRole("textbox", { name: /ngày về/i });
    await returnInput.click();

    await page.locator("table").locator("a", { hasText: "31" }).first().click();

    // ===== Step 4: Verify =====
    await expect(departInput).toHaveValue("25/03/2026");
    await expect(returnInput).toHaveValue("31/03/2026");

    // Verify route
    await expect(page.getByText(/sgn/i)).toBeVisible();
    await expect(page.getByText(/han/i)).toBeVisible();
});

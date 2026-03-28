import { expect, test } from "@playwright/test";
import { table } from "node:console";

test("WebTable", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");

    const rows = await page.locator("#table1 tbody tr").all();

    const tableData: string[][] = [];

    //build 2D array
    for (const row of rows) {
        const cells = await row.locator("td").allTextContents();
        tableData.push(cells);
    }

    //lấy danh sách due
    const dues = tableData.map((row) => Number(row[3].replace("$", "")));

    // tìm giá trị nhỏ nhất
    const minDue = Math.min(...dues);

    // lấy tất cả person có due = min

    const personWithMinDue = tableData
        .filter((row) => Number(row[3].replace("$", "")) === minDue)
        .map((row) => `${row[1]} ${row[0]}`);

    console.log(personWithMinDue);

    expect(personWithMinDue).toStrictEqual(["John Smith", "Tim Conway"]);
});

import { expect, test } from "@playwright/test";

test("verify max due person full name", async ({ page }) => {
    //json array [{firstName: 'John', lastName: 'Smith', due: '50.00'},...]
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = await page.locator("#table1");
    const rows = await table.locator("tbody tr");

    const tableData = await rows.evaluateAll((rows) => {
        return rows.map((row) => {
            const cells = row.querySelectorAll("td");
            return {
                firstName: cells[0].innerText,
                lastName: cells[1].innerText,
                due: cells[3].innerText.replace("$", ""),
            };
        });
    });
    console.log(tableData);
    //map, reduce, filter, find
    const { firstName, lastName } = tableData.reduce((prev, current) => {
        return parseFloat(prev.due) > parseFloat(current.due) ? prev : current;
    });
    expect(`${firstName} ${lastName}`).toBe("Doe Jason");
});
//verify fullname of min due person are ["john smith", "Tim Conway"]

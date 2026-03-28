import { test, expect } from "@playwright/test";

/**
 1. Mở trang

2. Lấy table

3. Lấy tất cả rows

4. Chạy JS trong browser để trích xuất data

5. Tạo mảng object

6. Dùng reduce tìm người có due lớn nhất

7. Assert kết quả
 */
test("verify max due person full name", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = await page.locator("#table1");
    const rows = await table.locator("tbody tr");

    const tableData = await rows.evaluateAll((rows) => {
        //Duyệt từng row để lấy dữ liệu
        return rows.map((row) => {
            //Lấy tất cả cell trong row
            const cells = row.querySelectorAll("td");
            //td = từng cột trong dòng

            //Trả về object cho từng row
            return {
                lastName: cells[0].innerText,
                firstName: cells[1].innerText,
                due: cells[3].innerText.replace("$", ""),
                //replace("$","") để bỏ ký hiệu $
            };
        });
    });
    //reduce() – tìm người có due lớn nhất
    //Duyệt từng phần tử trong mảng và "gom" lại thành 1 giá trị cuối cùng.
    const { firstName, lastName } = tableData.reduce((prev, current) => {
        return parseFloat(prev.due) > parseFloat(current.due) ? prev : current;
        //parseFloat() để chuyển string thành số thực để so sánh
        /***
         * prev.due > current.due ? prev : current:
Nếu due của prev > due của current → giữ prev
Ngược lại → lấy current
Cuối cùng, người có due lớn nhất được trả về
         */
    });
    expect(`${firstName} ${lastName}`).toBe("Jason Doe");
});

test("verify fullname of max due person", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");

    // const tableContents =  await page.locator("#table1 tbody tr td").allTextContents();
    // //print table content
    // console.log(tableContents);

    const dueAmounts = await page.locator("#table1 tbody tr td:nth-child(4)").allTextContents();
    // console.log(dueAmounts);
    //Give array  [ '$50.00', '$51.00', '$100.00', '$50.00' ]  find the index of item has max value?
    const maxDueValue = Math.max(...dueAmounts.map((amount) => parseFloat(amount.replace("$", ""))));
    const maxDueIndex = dueAmounts.indexOf("$" + maxDueValue.toFixed(2));
    // console.log(maxDueIndex);
    const firstName = await page
        .locator(`#table1 tbody tr:nth-child(${maxDueIndex + 1}) td:nth-child(2)`)
        .textContent();
    const lastName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex + 1}) td:nth-child(1)`).textContent();
    // console.log(`Full name of person with max due: ${firstName} ${lastName}`);
    expect(`${firstName} ${lastName}`).toBe("Jason Doe");
});

// verify fullname of min due person are ["john smith", "Tim Conway"] in table1

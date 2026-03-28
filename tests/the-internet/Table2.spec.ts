import { test, expect } from "../fixtures/the-internet.fixture";

test.describe("table1 tests", () => {
    test.beforeEach(async ({ tablePage }) => {
        await tablePage.goto();
        await tablePage.getTable1Data();
    });

    //sort tăng dần
    test("verify fullname of max due person", async ({ tablePage }) => {
        expect(await tablePage.getFullNameOfMaxDuePerson()).toBe("Jason Doe");
    });

    //sort giảm dần
    test("verify min due person fullname", async ({ tablePage }) => {
        expect(await tablePage.getFullNameOfMinDuePersons()).toEqual(["John Smith", "Tim Conway"]);
    });
});

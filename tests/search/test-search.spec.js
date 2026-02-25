import { test, expect } from "../fixtures.js"

test.describe("Search", () => {
    test("search test", async ({ page, homePage }) => {
        await homePage.navigate()
        await homePage.searchComponent.search("macbook")
        await expect(page.url()).toContain("index.php?route=product%2Fsearch&search=macbook")
    })
})

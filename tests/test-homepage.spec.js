import { test, expect } from "./fixtures.js"

test.describe("Homepage", () => {
    test("test homepage title", async ({ page, homePage }) => {
        await homePage.navigate()
        await expect(page).toHaveTitle("Your Store")
    })

    test("Test homepage url", async ({ page, homePage }) => {
        await homePage.navigate()
        await expect(page).toHaveURL(/\//)
    })
})

import { test, expect } from "@playwright/test"
import HomePage from "../pages/home-page"

test.describe("Search", () => {
    test("search test", async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.navigate()
        await homePage.searchComponent.search("macbook")
        await expect(page.url()).toBe("https://ecommerce-playground.lambdatest.io/index.php?route=product%2Fsearch&search=macbook")
    })
})
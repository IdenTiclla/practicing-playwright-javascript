import { test, expect } from "@playwright/test"
import HomePage from "../pages/home-page"

test.describe("Homepage", () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
    })

    test("test homepage title", async ({ page }) => {
        await homePage.navigate()
        await expect(page).toHaveTitle("Your Store")
    })
    
    test("Test homepage url", async ({ page }) => {
        await homePage.navigate()
        await expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/")
    })
})


import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
    test("test homepage title", async ({ page }) => {
        await page.goto("/")
        expect(page).toHaveTitle("Your Store")
    })
    test("Test homepage url", async ({ page }) => {
        await page.goto("/")
        expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/")
    })
})


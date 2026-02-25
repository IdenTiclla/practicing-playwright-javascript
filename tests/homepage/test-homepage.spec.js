import { test, expect } from "../fixtures.js"

test.describe("Homepage", () => {
    test("test homepage title", async ({ page, homePage }) => {
        await homePage.navigate()
        await expect(page).toHaveTitle("Your Store")
    })

    test("Test homepage url", async ({ page, homePage }) => {
        await homePage.navigate()
        await expect(page).toHaveURL(/\//)
    })

    test("should display the store logo", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.logo).toBeVisible()
    })

    test("should display the search input and search button", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.searchComponent.searchInput).toBeVisible()
        await expect(homePage.searchComponent.searchButton).toBeVisible()
    })

    test("should display the 'Shop by Category' button", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.shopByCategoryButton).toBeVisible()
    })

    test("should display the Top Trending Categories section", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.topTrendingHeading).toBeVisible()
    })

    test("should display the Top Products section", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.topProductsHeading).toBeVisible()
    })

    test("should display the Top Collection tabs", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.topCollectionHeading).toBeVisible()
        await expect(homePage.popularTab).toBeVisible()
        await expect(homePage.latestTab).toBeVisible()
        await expect(homePage.bestSellerTab).toBeVisible()
    })

    test("should navigate to the Special page from navbar", async ({ page, homePage }) => {
        await homePage.navigate()
        await homePage.specialLink.click()
        await expect(page).toHaveURL(/route=product\/special/)
    })

    test("should navigate to the Blog page from navbar", async ({ page, homePage }) => {
        await homePage.navigate()
        await homePage.blogLink.click()
        await expect(page).toHaveURL(/route=extension\/maza\/blog\/home/)
    })

    test("should display cart counter with 0 by default", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.cartCount).toBeVisible()
        await expect(homePage.cartCount).toHaveText("0")
    })

    test("should show empty cart message when cart is empty", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.emptyCartMessage).toBeVisible()
    })

    test("should display the dummy website disclaimer text", async ({ homePage }) => {
        await homePage.navigate()
        await expect(homePage.disclaimerText).toBeVisible()
    })

    test("should navigate to product page when clicking a Top Products item", async ({ page, homePage }) => {
        await homePage.navigate()
        await homePage.getFirstProductLink().click()
        await expect(page).toHaveURL(/route=product\/product&product_id=/)
    })
})

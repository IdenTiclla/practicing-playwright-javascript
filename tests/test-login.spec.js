import { test, expect } from "@playwright/test"
import HomePage from "../pages/home-page"
import LoginPage from "../pages/login-page"

test.describe("Login",() => {
    test("test login successfully", async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.navigate()
        await homePage.navbar.clickLogin()
        const loginPage = new LoginPage(page)
        await loginPage.fillEmail("jose.lopez@gmail.com")
        await loginPage.fillPassword("P@ssw0rd")
        await loginPage.clickLogin()
        await expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })
    test("test login with invalid credentials", async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.navigate()
        await homePage.navbar.clickLogin()
        const loginPage = new LoginPage(page)
        await loginPage.fillEmail("invalidemail@gmail.com")
        await loginPage.fillPassword("someinvalidpassword")
        await loginPage.clickLogin()
        await expect(page.url()).not.toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })
})
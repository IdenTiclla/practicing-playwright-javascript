import { test, expect } from "@playwright/test"
import HomePage from "../pages/home-page"
import LoginPage from "../pages/login-page"

test.describe("Login",() => {
    let homePage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
    })

    test("test login successfully", async ({ page }) => {
        await homePage.navigate()
        await homePage.navbar.clickLogin()
        await loginPage.fillEmail("jose.lopez@gmail.com")
        await loginPage.fillPassword("P@ssw0rd")
        await loginPage.clickLogin()
        await expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })
    test("test login with invalid credentials", async ({ page }) => {
        await homePage.navigate()
        await homePage.navbar.clickLogin()
        await loginPage.fillEmail("invalidemail@gmail.com")
        await loginPage.fillPassword("someinvalidpassword")
        await loginPage.clickLogin()
        await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible()
        await expect(page.url()).not.toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })

    test("test login with empty credentials", async ({ page }) => {
        await homePage.navigate()
        await homePage.navbar.clickLogin()
        await loginPage.clickLogin()
        await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible()
        await expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/login")    
    })      
})

import { test, expect } from "@playwright/test"
import HomePage from "../pages/home-page"
import LoginPage from "../pages/login-page"
import dotenv from 'dotenv'
import { faker } from "@faker-js/faker";

dotenv.config()

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
        await loginPage.login(process.env.VALID_EMAIL, process.env.VALID_PASSWORD)
        await expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })

    test("test login with invalid credentials", async ({ page }) => {
        await homePage.navigate();
        await homePage.navbar.clickLogin();
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();
        await loginPage.login(randomEmail, randomPassword);
        expect(await loginPage.alertError.isVisible()).toBe(true);
        expect(await loginPage.alertError.getErrorMessage()).toContain("Warning: No match for E-Mail Address and/or Password.")
        await expect(page.url()).not.toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })
})

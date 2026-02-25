import { test, expect } from "../fixtures.js"
import { faker } from "@faker-js/faker";

test.describe("Login",() => {
    test("test login successfully", async ({ page, homePage, loginPage }) => {
        await homePage.navigate()
        await homePage.navbar.clickLogin()
        await loginPage.login(process.env.VALID_EMAIL, process.env.VALID_PASSWORD)
        await expect(page.url()).toContain("index.php?route=account/account")
    })

    test("test login with invalid credentials", async ({ page, homePage, loginPage }) => {
        await homePage.navigate();
        await homePage.navbar.clickLogin();
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();
        await loginPage.login(randomEmail, randomPassword);
        expect(await loginPage.alertError.isVisible()).toBe(true);
        expect(await loginPage.alertError.getErrorMessage()).toContain("Warning: No match for E-Mail Address and/or Password.")
        await expect(page.url()).not.toContain("index.php?route=account/account")
    })
})

import { test, expect } from "@playwright/test"


test.describe("Login",() => {
    test("test login successfully", async ({ page }) => {
        await page.goto("/")
        await page.getByRole('button', { name: ' My account' }).hover()
        await page.getByRole('link', { name: 'Login', exact: true }).click();
        await page.getByLabel("E-Mail Address").click()
        await page.getByLabel("E-Mail Address").fill("jose.lopez@gmail.com")
        await page.getByLabel("Password").click()
        await page.getByLabel("Password").fill("P@ssw0rd")
        await page.getByRole("button", { name: "Login" }).click()
        await expect(page.url()).toContain("https://ecommerce-playground.lambdatest.io/index.php?route=account/account")    
    })
})
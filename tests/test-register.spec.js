import { test, expect } from "@playwright/test";
import HomePage from "../pages/home-page";
import RegisterPage from "../pages/register-page";

test.describe("Register", () => {
    test("Register with existing email shows error", async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.navbar.clickRegister();

        const registerPage = new RegisterPage(page);
        // Usar un email que ya esté registrado para probar el mensaje de error
        await registerPage.register("John", "Doe", "demo@opencart.com", "1234567890", "Password123", "Password123", false, true);

        // Verificar que el mensaje de error sea visible
        expect(await registerPage.alertError.isVisible()).toBe(true);

        // Verificar el contenido del mensaje de error
        expect(await registerPage.alertError.getErrorMessage()).toContain("Warning: E-Mail Address is already registered!");
    })

})
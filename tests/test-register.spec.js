import { test, expect } from "./fixtures.js";
import { faker } from "@faker-js/faker";

test.describe("Register", () => {
    test("Register with existing email shows error", async ({ homePage, registerPage }) => {
        await homePage.navigate();
        await homePage.navbar.clickRegister();

        // Usar un email que ya esté registrado para probar el mensaje de error
        await registerPage.register("John", "Doe", "demo@opencart.com", "1234567890", "Password123", "Password123", false, true);

        // Verificar que el mensaje de error sea visible
        expect(await registerPage.alertError.isVisible()).toBe(true);

        // Verificar el contenido del mensaje de error
        expect(await registerPage.alertError.getErrorMessage()).toContain("Warning: E-Mail Address is already registered!");
    })

    test("Register successfully", async ({ page, homePage, registerPage }) => {
        await homePage.navigate();
        await homePage.navbar.clickRegister();

        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomEmail = faker.internet.email();
        const randomPhoneNumber = faker.phone.number();
        const randomPassword = faker.internet.password();
        const randomNewsletter = faker.helpers.arrayElement([true, false]);
        const randomPrivacyPolicy = true


        await registerPage.register(randomFirstName, randomLastName, randomEmail, randomPhoneNumber,
             randomPassword, randomPassword, randomNewsletter, randomPrivacyPolicy);

        await expect(page.getByText("Your Account Has Been Created!")).toBeVisible();
    })

})

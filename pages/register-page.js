import BasePage from "./base-page";
import AlertError from "../components/alert-error";
import AlertSuccess from "../components/alert-success";

class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        this.firstNameInput = page.locator("input[name='firstname']");
        this.lastNameInput = page.locator("input[name='lastname']");
        this.emailInput = page.locator("input[name='email']");
        this.telephoneInput = page.locator("input[name='telephone']");
        this.passwordInput = page.locator("input[name='password']");
        this.confirmPasswordInput = page.locator("input[name='confirm']");
        this.acceptTermsCheckbox = page.locator("div.custom-checkbox");
        this.continueButton = page.locator("input[value='Continue']");
        this.alertError = new AlertError(page);
        this.alertSuccess = new AlertSuccess(page);
    }
    async checkSubscribe(subscribe) {
        subscribe ? await this.clickJavascript("#input-newsletter-yes") : await this.clickJavascript("#input-newsletter-no");
    }

    async checkAgreeTerms(agreeTerms) {
        if (agreeTerms) {
            await this.acceptTermsCheckbox.click();
        }
    }

    async register(firstName, lastName, email, telephone, password, confirmPassword, subscribe, agreeTerms) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.checkSubscribe(subscribe);
        await this.checkAgreeTerms(agreeTerms);
        await this.continueButton.click();
    }
}

export default RegisterPage;
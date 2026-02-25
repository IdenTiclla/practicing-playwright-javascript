import BasePage from "../base-page";
import AlertError from "../../components/alert-error";
class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = "/index.php?route=account/login"
        this.emailInput = page.getByLabel("E-Mail Address");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.locator("input[type='submit']");

        // components
        this.alertError = new AlertError(page);
    }
    async navigate() {
        await super.navigate(this.url)
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }
}

export default LoginPage;
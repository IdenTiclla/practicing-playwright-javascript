import BasePage from "./base-page";

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        this.emailInput = page.getByLabel("E-Mail Address");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.locator("input[type='submit']");
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
}

export default LoginPage;
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByLabel("E-Mail Address");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });
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
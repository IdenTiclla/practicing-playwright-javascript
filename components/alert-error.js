import BaseComponent from "./base-component.js";

class AlertError extends BaseComponent {
    constructor(page) {
        super(page);
        this.alertError = page.locator("div.alert-danger");
    }

    async isVisible() {
        return await this.alertError.isVisible();
    }

    async getErrorMessage() {
        return await this.alertError.textContent();
    }
}

export default AlertError;
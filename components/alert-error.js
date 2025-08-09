import BaseComponent from "./base-component.js";

class AlertError extends BaseComponent {
    constructor(page) {
        super(page);
        this.alertContainer = page.locator("div.alert-danger");
    }

    async isVisible() {
        return await this.alertContainer.isVisible();
    }   

    async getErrorMessage() {
        return await this.alertContainer.textContent();
    }
}

export default AlertError;
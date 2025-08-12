import BaseComponent from "./base-component";

class AlertSuccess extends BaseComponent {
    constructor(page) {
        super(page);
        this.alertSuccess = page.locator("div.alert.alert-success.alert-dismissible");
    }

    async getSuccessMessage() {
        return await this.alertSuccess.textContent();
    }
}

export default AlertSuccess;
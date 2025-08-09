class BaseComponent {
    constructor(page) {
        this.page = page;
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async fill(selector, value) {
        await this.page.fill(selector, value);
    }
}

export default BaseComponent;
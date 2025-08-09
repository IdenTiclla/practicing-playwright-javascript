class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return await this.page.url();
    }

    async waitForPageLoad(timeout = 30000) {
        await this.page.waitForLoadState("networkidle", { timeout });
    }

    async clickJavascript(selector) {
        await this.page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.click();
            }
        }, selector);
    }

}

export default BasePage;
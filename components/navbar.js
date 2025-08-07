class Navbar {
    constructor(page) {
        this.page = page;
        // modify this to select by contain 'My account'
        this.myAccountButton = page.locator("ul.horizontal a[href*='route=account/account']");
    }

    async hoverMyAccount() {
        await this.myAccountButton.hover();
    }

    async clickLogin() {
        await this.myAccountButton.hover();
        await this.page.getByRole('link', { name: 'Login' }).click();
    }
    

}

export default Navbar;
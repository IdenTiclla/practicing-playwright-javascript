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
        // await this.page.getByRole('link', { name: 'Login' }).click();
        const loginOption = this.page.locator("ul.mz-sub-menu-96 li a[href*='route=account/login']");
        await loginOption.click();
    }

    async clickRegister() {
        await this.myAccountButton.hover();
        const registerOption = this.page.locator("ul.mz-sub-menu-96 li a[href*='route=account/register']");
        await registerOption.click();
    }
    

}

export default Navbar;
import BaseComponent from "./base-component";

class Navbar extends BaseComponent {
    constructor(page) {
        super(page);
        // modify this to select by contain 'My account'
        this.myAccountButton = page.locator("ul.horizontal a[href*='route=account/account']");
    }

    async hoverMyAccount() {
        await this.myAccountButton.hover();
    }

    async clickLogin() {
        await this.myAccountButton.hover();
        await this.click("ul.mz-sub-menu-96 li a[href*='route=account/login']");
    }

    async clickRegister() {
        await this.myAccountButton.hover();
        await this.click("ul.mz-sub-menu-96 li a[href*='route=account/register']")
    }
    

}

export default Navbar;
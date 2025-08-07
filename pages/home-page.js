import Navbar from "../components/navbar";

class HomePage {
    constructor(page) {
        this.page = page;
        this.navbar = new Navbar(page);
    }

    async navigate() {
        await this.page.goto("/");
    }
    
}

export default HomePage;
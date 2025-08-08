import Navbar from "../components/navbar";
import BasePage from "./base-page";

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.navbar = new Navbar(page);
    }

    async navigate() {
        await super.navigate('/')   
    }
    
}

export default HomePage;
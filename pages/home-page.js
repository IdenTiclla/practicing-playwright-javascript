import Navbar from "../components/navbar";
import BasePage from "./base-page";
import SearchComponent from "../components/search-component";

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.navbar = new Navbar(page);
        this.searchComponent = new SearchComponent(page);
    }

    async navigate() {
        await super.navigate('/')
    }

}

export default HomePage;
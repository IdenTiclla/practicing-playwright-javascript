import Navbar from "../../components/navbar";
import BasePage from "../base-page";
import SearchComponent from "../../components/search-component";
import Carousel from "../../components/carousel";

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.navbar = new Navbar(page);
        this.searchComponent = new SearchComponent(page);
        this.carousel = new Carousel(page);

        this.logo = page.locator('img[alt="Poco Electro"]');
        this.shopByCategoryButton = page.getByRole("button", { name: "Shop by Category" });
        this.topTrendingHeading = page.getByRole("heading", { name: "Top Trending Categories" });
        this.topProductsHeading = page.getByRole("heading", { name: "Top Products" });
        this.topCollectionHeading = page.getByRole("heading", { name: "Top Collection" });
        this.popularTab = page.getByRole("link", { name: "Popular" });
        this.latestTab = page.getByRole("link", { name: "Latest" });
        this.bestSellerTab = page.getByRole("link", { name: "Best seller" });
        this.specialLink = page.locator("#widget-navbar-217834").getByRole("link", { name: /Special/ });
        this.blogLink = page.locator("#widget-navbar-217834").getByRole("link", { name: "Blog" });
        this.cartCount = page.locator('#entry_217825 span.cart-item-total');
        this.emptyCartMessage = page.getByText("Your shopping cart is empty!");
        this.disclaimerText = page.getByText("This is a dummy website for Web Automation Testing");
    }

    async navigate() {
        await super.navigate('/')
    }

    getFirstProductLink() {
        return this.page.getByRole("heading", { name: "iMac" }).first().getByRole("link");
    }

}

export default HomePage;
import BasePage from "../base-page"
import SearchComponent from "../../components/search-component"

class SearchPage extends BasePage {
    constructor(page) {
        super(page)
        this.searchComponent = new SearchComponent(page)

        // Search results page elements
        this.pageHeading = page.locator("#product-search h1")
        this.searchCriteriaInput = page.getByPlaceholder("Keywords")
        this.categoryDropdown = page.locator("#product-search select").first()
        this.searchInDescriptionLabel = page.locator("label[for='description']")
        this.searchInDescriptionCheckbox = page.locator("#description")
        this.searchInSubcategoriesLabel = page.locator("label[for='sub_category']")
        this.searchButton = page.locator("#button-search")
        this.noResultsMessage = page.locator("#product-search p")
        this.productCards = page.locator(".product-layout")
        this.productNames = page.locator(".product-layout h4 a")
        this.productPrices = page.locator(".product-layout .price")
        this.showingText = page.locator("#product-search .col-sm-6.text-end")
        this.sortByDropdown = page.locator("#product-search select[id^='input-sort']").first()
        this.showDropdown = page.locator("#product-search select[id^='input-limit']").first()
        this.autocompleteDropdown = page.locator("div#entry_217820 .dropdown-menu.autocomplete")
        this.autocompleteItems = page.locator("div#entry_217820 .dropdown-menu.autocomplete li a")
    }

    async navigate(searchTerm = "") {
        await super.navigate(`/index.php?route=product/search&search=${searchTerm}`)
    }

    async getHeadingText() {
        return await this.pageHeading.textContent()
    }

    async getProductCount() {
        return await this.productCards.count()
    }

    async getProductNames() {
        return await this.productNames.allTextContents()
    }

    async searchFromResultsPage(text) {
        await this.searchCriteriaInput.fill(text)
        await this.searchButton.click()
    }

    async selectCategory(category) {
        await this.categoryDropdown.selectOption({ label: category })
    }

    async checkSearchInDescriptions() {
        await this.searchInDescriptionLabel.click()
    }

    async sortBy(option) {
        await this.sortByDropdown.selectOption({ label: option })
    }

    async setShowCount(count) {
        await this.showDropdown.selectOption({ label: count })
    }

    async typeInSearchBar(text) {
        await this.searchComponent.searchInput.fill("")
        await this.searchComponent.searchInput.pressSequentially(text, { delay: 150 })
    }

    async getAutocompleteItems() {
        return await this.autocompleteItems.allTextContents()
    }

    async isAutocompleteVisible() {
        return await this.autocompleteDropdown.isVisible()
    }

    async clickFirstAutocompleteItem() {
        await this.autocompleteItems.first().click()
    }
}

export default SearchPage

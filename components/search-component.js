import BaseComponent from "./base-component"

class SearchComponent extends BaseComponent {
    constructor(page) {
        super(page)
        this.searchInput = page.locator("div#entry_217820 input[name='search']")
        this.searchButton = page.locator("div#entry_217820 div.search-button > button")
    }

    async search(text) {
        await this.searchInput.fill(text)
        await this.searchButton.click()
    }
}

export default SearchComponent
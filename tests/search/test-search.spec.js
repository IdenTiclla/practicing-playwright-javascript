import { test, expect } from "../fixtures.js"
import { faker } from "@faker-js/faker"

test.describe("Search", () => {
    test.beforeEach(async ({ homePage }) => {
        // Navigate to the homepage before each test
        await homePage.navigate()
    })

    test("should search for a product and display results", async ({ page, homePage, searchPage }) => {
        // Search for "macbook" using the search bar
        await homePage.searchComponent.search("macbook")

        // Verify URL contains the search query
        await expect(page).toHaveURL(/search=macbook/)

        // Verify page heading shows the search term
        await expect(searchPage.pageHeading).toHaveText("Search - macbook")

        // Verify product results are displayed
        await expect(searchPage.productCards.first()).toBeVisible()
        expect(await searchPage.getProductCount()).toBeGreaterThan(0)
    })

    test("should display no results message for non-existent product", async ({ page, homePage, searchPage }) => {
        // Generate a random non-existent search term
        const randomTerm = faker.string.alphanumeric(15)

        // Search for the random term
        await homePage.searchComponent.search(randomTerm)

        // Verify URL contains the search query
        await expect(page).toHaveURL(new RegExp(`search=${randomTerm}`))

        // Verify the no results message is displayed
        await expect(searchPage.noResultsMessage).toContainText(
            "There is no product that matches the search criteria."
        )

        // Verify no product cards are shown
        await expect(searchPage.productCards).toHaveCount(0)
    })

    test("should display autocomplete suggestions while typing", async ({ searchPage }) => {
        // Type "iph" slowly to trigger autocomplete
        await searchPage.typeInSearchBar("iph")

        // Wait for autocomplete dropdown to appear
        await expect(searchPage.autocompleteDropdown).toBeVisible()

        // Verify suggestions contain relevant products
        await expect(searchPage.autocompleteItems.first()).toBeVisible()
        expect(await searchPage.autocompleteItems.count()).toBeGreaterThan(0)
    })

    test("should navigate to product page when clicking autocomplete suggestion", async ({ page, searchPage }) => {
        // Type "iph" slowly to trigger autocomplete
        await searchPage.typeInSearchBar("iph")

        // Wait for autocomplete suggestions to appear
        await expect(searchPage.autocompleteDropdown).toBeVisible()
        await expect(searchPage.autocompleteItems.first()).toBeVisible()

        // Click the first suggestion and wait for navigation
        await searchPage.clickFirstAutocompleteItem()

        // Verify navigation to a product page
        await expect(page).toHaveURL(/route=product\/product/, { timeout: 10000 })
    })

    test("should search by pressing Enter key", async ({ page, homePage, searchPage }) => {
        // Fill the search input with "iphone"
        await homePage.searchComponent.searchInput.fill("iphone")

        // Press Enter key to submit search
        await homePage.searchComponent.searchInput.press("Enter")

        // Verify URL contains the search query
        await expect(page).toHaveURL(/search=iphone/)

        // Verify search results are displayed
        await expect(searchPage.productCards.first()).toBeVisible()
    })

    test("should search from the results page using the search criteria form", async ({ page, searchPage }) => {
        // Navigate to search results page for "macbook"
        await searchPage.navigate("macbook")

        // Verify initial results show macbook products
        await expect(searchPage.pageHeading).toHaveText("Search - macbook")

        // Clear and type new search term in the criteria input
        await searchPage.searchFromResultsPage("iphone")

        // Verify results update to show iPhone products
        await expect(page).toHaveURL(/search=iphone/)
        await expect(searchPage.pageHeading).toHaveText("Search - iphone")
        const productNames = await searchPage.getProductNames()
        expect(productNames.some(name => name.toLowerCase().includes("iphone"))).toBeTruthy()
    })

    test("should filter search results by category", async ({ page, searchPage }) => {
        // Navigate to search results page
        await searchPage.navigate("apple")

        // Select "Laptops" category from the dropdown
        await searchPage.selectCategory("Laptops")

        // Check "Search in product descriptions" to broaden results
        await searchPage.checkSearchInDescriptions()

        // Click Search on the results page
        await searchPage.searchButton.click()

        // Verify URL contains category parameter
        await expect(page).toHaveURL(/category_id/)

        // Verify page heading shows the search term
        await expect(searchPage.pageHeading).toContainText("Search - apple")
    })

    test("should sort search results by name A-Z", async ({ page, searchPage }) => {
        // Navigate to search results for "macbook"
        await searchPage.navigate("macbook")

        // Wait for results to load
        await expect(searchPage.productCards.first()).toBeVisible()

        // Change sort by to "Name (A - Z)"
        await searchPage.sortBy("Name (A - Z)")

        // Wait for page to reload with sorted results
        await expect(page).toHaveURL(/sort=pd.name/)

        // Verify products are displayed in alphabetical order
        const names = await searchPage.getProductNames()
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b))
        expect(names).toEqual(sortedNames)
    })

    test('should search with "Search in product descriptions" enabled', async ({ page, searchPage }) => {
        // Navigate to search results page for a general term
        await searchPage.navigate("processor")

        // Check the "Search in product descriptions" checkbox
        await searchPage.checkSearchInDescriptions()

        // Click Search to apply the filter
        await searchPage.searchButton.click()

        // Verify URL contains the description search parameter
        await expect(page).toHaveURL(/description=true/)

        // Verify results are displayed (descriptions are now also searched)
        await expect(searchPage.pageHeading).toContainText("Search - processor")
    })

    test("should retain search term in search bar after search", async ({ page, homePage, searchPage }) => {
        // Search for "macbook" from the homepage
        await homePage.searchComponent.search("macbook")

        // Verify the search criteria input on results page contains "macbook"
        await expect(searchPage.searchCriteriaInput).toHaveValue("macbook")

        // Verify the header search bar also retains "macbook"
        await expect(homePage.searchComponent.searchInput).toHaveValue("macbook")
    })
})

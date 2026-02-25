import { test, expect } from "../fixtures.js"

test.describe("Homepage Carousel", () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate()
    })

    test("should display the carousel with 3 slides and indicators", async ({ homePage }) => {
        const { carousel } = homePage
        await expect(carousel.carousel).toBeVisible()
        expect(await carousel.getSlidesCount()).toBe(3)
        expect(await carousel.getIndicatorsCount()).toBe(3)
    })

    test("should navigate to the next slide when clicking the next arrow", async ({ homePage }) => {
        const { carousel } = homePage
        const firstSlideAlt = await carousel.getActiveSlideImageAlt()

        await carousel.clickNext()
        await expect(carousel.activeSlide.locator("img")).not.toHaveAttribute("alt", firstSlideAlt)
    })

    test("should navigate to first slide when clicking on indicator", async ({ homePage }) => {
        const { carousel } = homePage

        await carousel.clickIndicator(0)
        await expect(carousel.activeSlide.locator("img")).toHaveAttribute("alt", "Iphone 11 pro max")
    })

    test("should navigate to second slide when clicking on indicator", async ({ homePage }) => {
        const { carousel } = homePage

        await carousel.clickIndicator(1)
        await expect(carousel.activeSlide.locator("img")).toHaveAttribute("alt", "Microsoft smartwatch")
    })


    test("should navigate to third slide when clicking an indicator", async ({ homePage }) => {
        const { carousel } = homePage

        await carousel.clickIndicator(2)
        await expect(carousel.activeSlide.locator("img")).toHaveAttribute("alt", "Canon DSLR camera")
    })
})

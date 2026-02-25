import BaseComponent from "./base-component";

class Carousel extends BaseComponent {
    constructor(page) {
        super(page);
        this.carousel = page.locator("#mz-carousel-218380");
        this.slides = this.carousel.locator(".carousel-item");
        this.activeSlide = this.carousel.locator(".carousel-item.active");
        this.indicators = this.carousel.locator(".carousel-indicators li");
        this.nextButton = this.carousel.locator(".carousel-control-next");
        this.prevButton = this.carousel.locator(".carousel-control-prev");
    }

    async getActiveSlideImageAlt() {
        return await this.activeSlide.locator("img").getAttribute("alt");
    }

    async clickNext() {
        await this.carousel.hover();
        await this.nextButton.click();
    }

    async clickPrev() {
        await this.carousel.hover();
        await this.prevButton.click();
    }

    async clickIndicator(index) {
        await this.indicators.nth(index).click();
    }

    async getSlidesCount() {
        return await this.slides.count();
    }

    async getIndicatorsCount() {
        return await this.indicators.count();
    }
}

export default Carousel;

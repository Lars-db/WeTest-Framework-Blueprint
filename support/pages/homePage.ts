import { type Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly signInLink: Locator;
    readonly productNames: Locator;

    constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;

        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.signInLink = page.getByTestId('nav-sign-in');
        this.productNames = page.getByTestId('product-name');
    }

    async goto() {
        await this.page.goto('/');
    }

    async searchFor(query: string) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async goToSignIn() {
        await this.signInLink.click();
    }
}

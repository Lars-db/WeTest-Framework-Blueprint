import { type Locator, Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly signInLink: Locator;
    readonly productNames: Locator;

    constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;
        const t = getTranslations(language).homePage;

        this.searchInput = page.getByRole('textbox', { name: t.searchQueryInput });
        this.searchButton = page.getByRole('button', { name: t.searchSubmitButton });
        this.signInLink = page.getByRole('link', { name: t.signInLink });
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

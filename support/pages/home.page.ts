import { type Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly signInLink: Locator;
    readonly productNames: Locator;

    constructor(page: Page, language?: string) {
        super(page, language);
        const t = this.t.homePage;

        this.searchInput = this.page.getByRole('textbox', { name: t.searchQueryInput });
        this.searchButton = this.page.getByRole('button', { name: t.searchSubmitButton });
        this.signInLink = this.page.getByRole('link', { name: t.signInLink });
        this.productNames = this.page.getByTestId('product-name');
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
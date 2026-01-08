import { type Locator, Page } from '@playwright/test';

// Define a class for shared components (like header, footer, etc.)
export class SharedComponents {
    readonly page: Page;
    readonly header: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('header');
        this.footer = page.locator('footer');
    }
}

// async closeCookies() {

// };
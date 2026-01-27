import { type Locator, Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

// Define a class for shared components (like header, footer, etc.)
export class SharedComponents {
    readonly page: Page;
    readonly header: Locator;
    readonly footer: Locator;

    constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;
        const t = getTranslations(language).sharedComponents;

        this.header = page.getByRole('menuitem', { name: t.header });
        this.footer = page.getByRole('menuitem', { name: t.footer });
    }
}

// async closeCookies() {

// };
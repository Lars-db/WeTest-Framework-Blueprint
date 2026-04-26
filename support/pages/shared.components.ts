import { type Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SharedComponents extends BasePage {
    readonly header: Locator;
    readonly footer: Locator;

    constructor(page: Page, language?: string) {
        super(page, language);
        const t = this.t.sharedComponents;

        this.header = this.page.getByRole('menuitem', { name: t.header });
        this.footer = this.page.getByRole('menuitem', { name: t.footer });
    }
}
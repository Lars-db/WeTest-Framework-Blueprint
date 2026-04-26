import { Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly language: string;

    protected constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;
        this.language = language;
    }

    protected get t() {
        return getTranslations(this.language);
    }
}

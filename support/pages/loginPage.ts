import { type Locator, Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;
        const t = getTranslations(language).loginPage;
        
                
        this.usernameInput = page.getByRole('textbox', { name: t.usernameInput });
        this.passwordInput = page.getByRole('textbox', { name: t.passwordInput });
    }
}

// async enterLoginCredentials(username: string, password: string) {
//     await this.usernameInput.fill(username);
//     await this.passwordInput.fill(password);
// };
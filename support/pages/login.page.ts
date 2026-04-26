import { type Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page, language?: string) {
        super(page, language);
        const t = this.t.loginPage;

        this.usernameInput = this.page.getByRole('textbox', { name: t.usernameInput });
        this.passwordInput = this.page.getByRole('textbox', { name: t.passwordInput });
        this.loginButton = this.page.getByRole('button', { name: t.loginSubmitButton });
        this.loginError = this.page.getByRole('alert').filter({ hasText: t.loginError });
    }

    async enterLoginCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
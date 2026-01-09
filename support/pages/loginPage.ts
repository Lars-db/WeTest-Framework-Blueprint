import { type Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
    }
}

// async enterLoginCredentials(username: string, password: string) {
//     await this.usernameInput.fill(username);
//     await this.passwordInput.fill(password);
// };
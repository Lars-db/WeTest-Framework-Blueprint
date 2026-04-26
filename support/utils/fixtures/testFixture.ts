import { test as baseTest, Browser, Page } from '@playwright/test';
import { AssertionHelper } from '../helpers/assertionHelper';
import { SharedComponents } from '../../pages/shared.components';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';
import { ChatPage } from '../../pages/chat.page';
import { createLogger } from '../logger';
import type { Logger } from 'winston';

export type CombinedFixtures = {
    browser: Browser;
    page: Page;
    assertionHelper: AssertionHelper;
    sharedComponents: SharedComponents;
    homePage: HomePage;
    loginPage: LoginPage;
    chatPage: ChatPage;
    logger: Logger;
};

const test = baseTest.extend<CombinedFixtures>({
    page: async ({ browser, contextOptions }, use) => {
        const context = await browser.newContext(contextOptions);
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
    assertionHelper: async ({}, use) => {
        const assertionHelper = new AssertionHelper();
        await use(assertionHelper);
    },
    sharedComponents: async ({ page }, use) => {
        const sharedComponents = new SharedComponents(page);
        await use(sharedComponents);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    chatPage: async ({ page }, use) => {
        const chatPage = new ChatPage(page);
        await use(chatPage);
    },
    logger: async ({ }, use) => {
        const logger = createLogger();
        await use(logger);
    },
});

export { test };
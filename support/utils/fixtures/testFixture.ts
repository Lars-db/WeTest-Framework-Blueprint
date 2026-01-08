import { test as baseTest, Browser, Page } from '@playwright/test';
import { AssertionHelper } from '../helpers/assertionHelper';
import { SharedComponents } from '../../pages/sharedComponents';
import { createLogger } from '../logger';
import type { Logger } from 'winston';

export type CombinedFixtures = {
    browser: Browser;
    page: Page;
    assertionHelper: AssertionHelper;
    sharedComponents: SharedComponents;
    logger: Logger;
};

const test = baseTest.extend<CombinedFixtures>({
    page: async ({ browser }, use) => {
        const context = await browser.newContext();
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
    logger: async ({ }, use) => {
        const logger = createLogger();
        await use(logger);
    },
});

export { test };
import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * AUTH SETUP
 *
 * Runs once before any test project that lists 'setup' as a dependency.
 * Logs in as each role and persists the browser storage state (cookies +
 * localStorage) to a JSON file. Tests consume these files via:
 *   - playwright.config.ts  →  storageState at the project level
 *   - test.use({ storageState })  →  opt-in per spec
 *
 * Benefits:
 *   ✓ Each role logs in exactly once per test run, regardless of parallelism
 *   ✓ Tests start already authenticated — no login boilerplate
 *   ✓ Auth failures surface immediately in setup, not scattered across tests
 */

const authDir = path.join('tests', '.auth');

setup.beforeAll(() => {
    fs.mkdirSync(authDir, { recursive: true });
});

setup('authenticate as customer', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    // eslint-disable-next-line playwright/no-standalone-expect
    await expect(page).toHaveURL(/account/, { timeout: 10_000 });

    await page.context().storageState({ path: path.join(authDir, 'customer.json') });
    console.log('Setup: customer auth state saved.');
});

setup('authenticate as admin', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    // eslint-disable-next-line playwright/no-standalone-expect
    await expect(page).toHaveURL(/admin/, { timeout: 10_000 });

    await page.context().storageState({ path: path.join(authDir, 'admin.json') });
    console.log('Setup: admin auth state saved.');
});

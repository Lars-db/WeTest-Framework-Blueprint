import { test as setup, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { UserFactory, UserRole } from '../support/utils/factories/userFactory';

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

const roles: { role: UserRole; redirectPattern: RegExp }[] = [
    { role: 'customer', redirectPattern: /account/ },
    { role: 'admin',    redirectPattern: /admin/   },
];

async function loginAndSave(page: Page, role: UserRole, redirectPattern: RegExp) {
    const { email, password } = UserFactory.byRole(role);
    await page.goto('/auth/login');
    await page.locator('[data-test="email"]').fill(email);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-submit"]').click();

    await expect(page).toHaveURL(redirectPattern, { timeout: 10_000 });

    await page.context().storageState({ path: path.join(authDir, `${role}.json`) });
    console.log(`Setup: ${role} auth state saved.`);
}

setup.beforeAll(() => {
    fs.mkdirSync(authDir, { recursive: true });
});

roles.forEach(({ role, redirectPattern }) => {
    setup(`authenticate as ${role}`, async ({ page }) => {
        await loginAndSave(page, role, redirectPattern);
    });
});

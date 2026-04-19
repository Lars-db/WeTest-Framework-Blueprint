import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * GOOD STORAGE STATE TEST EXAMPLE
 *
 * Why this is a GOOD test:
 * 1. Efficiency: Authentication is handled once by tests/auth.setup.ts before
 *    any test runs. No login overhead per test.
 * 2. Playwright Best Practice: storageState is set at spec level via test.use(),
 *    making the dependency explicit and visible.
 * 3. Atomic Tests: Tests focus entirely on the feature under test — they start
 *    already authenticated and go straight to the page they need.
 * 4. Role flexibility: A different role (e.g. admin) can be used by pointing
 *    storageState to tests/.auth/admin.json instead.
 * 5. Stable Locators: Uses 'data-test' attributes so layout changes don't
 *    break the tests.
 */

// Auth state is created by tests/auth.setup.ts — guaranteed to exist before
// any test in the 'chromium' project runs.
test.use({ storageState: path.join('tests', '.auth', 'customer.json') });

test.describe('Account Profile - Good Storage State', () => {

    test('should display user profile information using saved state', async ({ page }) => {
        // No login step needed — browser context already has the customer session.
        await page.goto('/account/profile');

        await expect(page.locator('[data-test="first-name"]')).not.toBeEmpty();
        await expect(page.locator('[data-test="last-name"]')).not.toBeEmpty();
        await expect(page.locator('[data-test="email"]')).toHaveValue('customer@practicesoftwaretesting.com');
    });

    test('should allow navigating to other protected pages without re-login', async ({ page }) => {
        await page.goto('/account/messages');

        await expect(page).not.toHaveURL(/login/);
        await expect(page.locator('h1')).toBeVisible();
    });

});

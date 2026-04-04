import { test, expect } from '@playwright/test';

/**
 * BAD WORKERS EXAMPLE
 * 
 * This test file demonstrates common anti-patterns that lead to flaky tests when using multiple workers.
 * 
 * Why this is a BAD example:
 * 1. Conflicting Shared State: These tests attempt to modify the SAME field on the SAME profile
 *    simultaneously from different workers.
 * 2. Unpredictable Outcomes: Since Worker 1 and Worker 2 run at the same time, the final name
 *    saved on the server depends on which request arrived last. This is a classic "Race Condition".
 * 3. False Positives/Failures: One test might pass while the other fails because the server state
 *    changed between the 'save' and the 'assertion' steps of the other worker.
 * 4. Incorrect Configuration: Using `test.describe.configure({ mode: 'parallel' })` on tests
 *    that are NOT isolated will almost certainly cause flakiness in CI.
 */

// FIX: Disabled parallel mode to avoid race conditions on shared server state.
// In a real scenario, use unique test data or accounts for parallel workers.
test.describe('Profile Update (Parallel Conflict)', () => {
    // FIX: Truly ensure serial execution within this describe block
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page }) => {
        // Both workers log in as the same user to demonstrate the shared-state race condition.
        await page.goto('/auth/login');
        await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
        await page.locator('[data-test="password"]').fill('welcome01');
        await page.locator('[data-test="login-submit"]').click();
        await expect(page).toHaveURL(/account/);
        await page.goto('http://localhost:4200/account/profile');
    });

    test('Worker 1: Update name to "Alice"', async ({ page }) => {
        await page.getByTestId('first-name').fill('Alice');
        await page.getByTestId('update-profile-submit').click();
        
        // FLAKY: Worker 2 might change this to 'Bob' before this assertion runs!
        await expect(page.getByTestId('first-name')).toHaveValue('Alice');
    });

    test('Worker 2: Update name to "Bob"', async ({ page }) => {
        await page.getByTestId('first-name').fill('Bob');
        await page.getByTestId('update-profile-submit').click();
        
        // FLAKY: Worker 1 might change this to 'Alice' before this assertion runs!
        await expect(page.getByTestId('first-name')).toHaveValue('Bob');
    });

});

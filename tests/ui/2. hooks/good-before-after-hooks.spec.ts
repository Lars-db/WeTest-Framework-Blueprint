import { test, expect } from '@playwright/test';

/**
 * GOOD BEFORE-AND-AFTER HOOKS TEST EXAMPLE
 * 
 * Why this is a GOOD test:
 * 1. Clean Setup (beforeEach): It uses `beforeEach` to handle repetitive setup actions like navigating to the login page. 
 *    This keeps the individual tests focused on their specific logic rather than boilerplate navigation.
 * 2. Logical Grouping (test.describe): Tests are grouped by functionality, and hooks are scoped to this group.
 * 3. State Reset: While not strictly needed for navigation, `beforeEach` ensures every test starts from a fresh page state.
 * 4. Cleanup (afterEach): Demonstrates how to perform cleanup (like clearing storage) to ensure test isolation and prevent state leakage.
 * 5. Descriptive & Stable Locators: Uses `data-test` attributes for all interactions, making the test resilient to UI changes.
 * 6. Avoids Assertion in Hooks: Hooks are used for setup/teardown only, not for verifying business logic (which belongs in `test` blocks).
 */

test.describe('User Login Flow - Good Hooks', () => {

  // This hook runs before each test in this block
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before every test
    await page.goto('/auth/login');
    
    // Optional: Log that setup is starting
    console.log(`[SETUP] Navigated to login page for test: ${test.info().title}`);
  });

  // This hook runs after each test in this block
  test.afterEach(async ({ page }) => {
    // Cleanup: Clear local storage and cookies to ensure the next test starts fresh
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    // Optional: Log that cleanup is finished
    console.log(`[CLEANUP] Cleared state after test: ${test.info().title}`);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // We start already at the login page thanks to beforeEach
    await page.locator('[data-test="email"]').fill('invalid@example.com');
    await page.locator('[data-test="password"]').fill('WrongPassword123!');
    await page.locator('[data-test="login-submit"]').click();

    // Verify the error message
    const errorAlert = page.locator('[data-test="login-error"]');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Invalid email or password');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Just click submit without filling anything
    await page.locator('[data-test="login-submit"]').click();

    // Verify validation messages appear
    await expect(page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(page.locator('[data-test="password-error"]')).toBeVisible();
  });

});
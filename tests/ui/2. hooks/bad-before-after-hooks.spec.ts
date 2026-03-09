import { test, expect } from '@playwright/test';

/**
 * BAD BEFORE-AND-AFTER HOOKS TEST EXAMPLE
 * 
 * Why this is a BAD test:
 * 1. Overloaded Hooks: The `beforeEach` hook is doing way too much (navigation + interaction). If it fails, you won't know if the problem was the page load or the interaction.
 * 2. Assertions in Hooks: Putting `expect` in a hook is an anti-pattern. Assertions should be in the `test` blocks so that failures are correctly attributed to a test case.
 * 3. Implicit State Dependency: The tests rely on the hook to leave the page in a specific state, making them hard to read and fragile.
 * 4. Poor Locators: Uses generic tags and CSS classes instead of stable `data-test` attributes.
 * 5. Irrelevant Cleanup: The `afterEach` hook performs a screenshot for EVERY test regardless of success/failure, which slows down the suite and fills up storage unnecessarily (use config for this instead).
 */

test.describe('Login - Bad Hooks', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    
    // BAD: Putting interaction logic in a hook that runs for EVERY test
    await page.locator('input').first().fill('test@test.com');
    
    // BAD: Putting an assertion in a hook
    await expect(page).toHaveTitle(/Login/);
  });

  test.afterEach(async ({ page }) => {
    // BAD: Unnecessary overhead for every single test
    await page.screenshot({ path: `screenshot-${test.info().title}.png` });
  });

  test('login attempt', async ({ page }) => {
    // This test is confusing because the email is already filled in the hook (hidden logic)
    await page.locator('.btnSubmit').click();
    
    // Vague locator and assertion
    const error = await page.locator('.alert').textContent();
    expect(error).toBeTruthy();
  });

  test('check forgot password link', async ({ page }) => {
    // The hook filled out the email field even though this test doesn't need it (unnecessary setup)
    await page.locator('a').filter({ hasText: 'Forgot your password?' }).click();
    await expect(page).toHaveURL(/forgot-password/);
  });

});

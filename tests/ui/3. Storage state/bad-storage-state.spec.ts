import { test, expect } from '@playwright/test';

/**
 * BAD STORAGE STATE TEST EXAMPLE
 * 
 * Why this is a BAD test:
 * 1. Slow Execution: This test performs a full UI login for EVERY single test case. In a large suite, 
 *    this can add minutes of overhead, making the feedback loop much slower.
 * 2. High Maintenance: If the login UI changes slightly (e.g., a new field added), many unrelated 
 *    tests that depend on this login step will fail simultaneously.
 * 3. Not Atomic: The tests are not focused. They spend 90% of their time on authentication logic 
 *    which should be tested elsewhere.
 * 4. Resource Intensive: It triggers an extra login API call and multiple page loads for every test, 
 *    putting unnecessary load on the test environment.
 * 5. Flakiness Risk: Since every test depends on a complex login flow, any temporary glitch in the 
 *    authentication service will cause all tests in the suite to fail.
 */

test.describe('Account - Bad Storage State (Repeated Login)', () => {

  // BAD: Performing a UI login for every test!
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    // Using brittle locators (BAD)
    await page.locator('input').first().fill('customer@practicesoftwaretesting.com');
    await page.locator('input').nth(1).fill('welcome01');
    await page.locator('input[type="submit"]').click();
    
    // Wait for the login to complete
    await page.waitForURL(/account/);
  });

  test('profile check (slow)', async ({ page }) => {
    // This test took a long time just to get here
    await page.goto('/account/profile');
    
    // Verification logic
    const firstName = page.locator('[data-test="first-name"]');
    await expect(firstName).toHaveValue("Jane");
  });

  test('messages check (slow)', async ({ page }) => {
    // This test repeated the exact same login steps as the previous one
    await page.goto('/account/messages');
    
    const pageHeader = page.locator('h1');
    await expect(pageHeader).toHaveText('Messages');
  });

});

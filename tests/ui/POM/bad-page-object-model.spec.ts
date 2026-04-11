import { test, expect } from '@playwright/test';

/**
 * BAD PAGE OBJECT MODEL EXAMPLE
 * 
 * This test demonstrates anti-patterns that defeat the purpose of the Page Object Model (POM).
 * 
 * Why this is a BAD example:
 * 1. Mixing Page Logic with Test Logic: The locators are hardcoded directly in the test script. 
 *    If the UI changes, you'll have to find and fix this string in every test that uses it.
 * 2. Brittle Locators: Using CSS selectors like `.navbar-nav .nav-link` or input IDs 
 *    instead of stable `data-test` attributes. These are highly likely to break during a redesign.
 * 3. Low-Level Interactions: The test performs individual `fill()` and `click()` actions. 
 *    Higher-level business actions like `login()` or `search()` should be in a Page Object.
 * 4. Code Duplication: The same locator for the search box or sign-in link is likely 
 *    repeated in many other "bad" tests.
 * 5. Violates DRY (Don't Repeat Yourself): Every test has to re-instantiate or re-locate 
 *    the same elements.
 */

test.describe('Search functionality (BAD POM)', () => {

    test('should search for a product (Brittle version)', async ({ page }) => {
        // BAD: Hardcoded URL
        await page.goto('http://localhost:4200/');

        // BAD: Hardcoded brittle locator (CSS)
        // Note: These might fail if the site doesn't use these specific generic classes.
        const searchInput = page.getByPlaceholder('Search');
        const searchButton = page.locator('button:has-text("Search")');

        // BAD: Exposing low-level implementation details in the test
        await searchInput.fill('Hammer');
        await searchButton.click();

        // BAD: Complex locator logic in the middle of a test
        const firstResult = page.locator('.card-title').first();
        await expect(firstResult).toContainText('Hammer');
    });

    test('should navigate to login (Brittle version)', async ({ page }) => {
        await page.goto('http://localhost:4200/');

        // BAD: Relying on text content or position which is prone to change
        // If the site is translated or the menu is reordered, this will fail.
        const signInButton = page.locator('text=Sign in');
        await signInButton.click();

        await expect(page).toHaveURL(/.*\/auth\/login/);
    });

});

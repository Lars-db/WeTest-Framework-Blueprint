import { test, expect } from '@playwright/test';

/**
 * GOOD WORKERS EXAMPLE
 * 
 * This test file demonstrates how to safely use Playwright Workers for parallel execution.
 * 
 * Why this is a GOOD example:
 * 1. Independent Tests: Each test operates on a unique set of data or performs read-only actions.
 *    They don't share or modify a global state that another test depends on.
 * 2. Parallel Mode: We explicitly enable parallel mode using `test.describe.configure({ mode: 'parallel' })`.
 *    This tells Playwright that it's safe to run these tests in multiple workers simultaneously.
 * 3. Stable Locators: Uses 'data-test' attributes which are less likely to change than CSS/XPath.
 * 4. Fast Execution: By running in parallel, the total execution time of the suite is reduced.
 */

test.describe.configure({ mode: 'parallel' });

test.describe('Search functionality (Parallel Safe)', () => {

    test.beforeEach(async ({ page }) => {
        // Each worker gets its own browser context and page, ensuring isolation at the browser level.
        await page.goto('http://localhost:4200/');
    });

    test('Search for "Hammer"', async ({ page }) => {
        await page.getByTestId('search-query').fill('Hammer');
        await page.getByTestId('search-submit').click();
        
        // We expect to see results for Hammer. This is a read-only check.
        await expect(page.getByTestId('product-name')).toContainText(['Hammer'], { ignoreCase: true });
    });

    test('Search for "Pliers"', async ({ page }) => {
        await page.getByTestId('search-query').fill('Pliers');
        await page.getByTestId('search-submit').click();
        
        // Even if this runs at the same time as the Hammer search, they are in different workers/pages.
        await expect(page.getByTestId('product-name')).toContainText(['Pliers'], { ignoreCase: true });
    });

    test('Filter by Brand "ForgeFlex Tools"', async ({ page }) => {
        await page.getByLabel('ForgeFlex Tools').check();
        
        // Verify that the results container appeared or updated
        await expect(page.locator('.card').first()).toBeVisible();
    });

});

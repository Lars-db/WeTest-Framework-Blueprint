import { test, expect } from '@playwright/test';

/**
 * FIXED TEST INFO EXAMPLE
 * 
 * This test file shows how the "BAD TEST INFO" version was corrected.
 * It demonstrates how to use the `testInfo` object for reporting and observability 
 * without letting it drive the test logic itself.
 * 
 * What was fixed:
 * 1. Independent Business Logic: The test uses an explicit constant `productToSearch` 
 *    instead of `testInfo.title`. This prevents the test from breaking if its name changes.
 * 2. Consistent Assertions: Verification logic is now the same regardless of `testInfo.retry`.
 *    A test should always fail on the first attempt if it's going to fail on any attempt.
 * 3. Proper Reporting: Uses `testInfo.annotations` and `testInfo.attach()` for their intended
 *    purpose: adding context to reports, not controlling flow.
 */

test('Search for Hammer', async ({ page }, testInfo) => {
    // FIXED: Using an explicit constant for the test data.
    const productToSearch = 'Hammer';

    // We can still use testInfo for reporting purposes
    testInfo.annotations.push({ type: 'test-data', description: `Searching for product: ${productToSearch}` });

    await page.goto('/');

    const searchQuery = page.getByTestId('search-query');
    const searchSubmit = page.getByTestId('search-submit');

    await searchQuery.fill(productToSearch);
    await searchSubmit.click();

    // FIXED: The assertion is now consistent across all attempts.
    // Note: We use .toContainText because multiple products might be returned in results.
    await expect(page.getByTestId('product-name')).toContainText([productToSearch], { ignoreCase: true });

    // FIXED: Attaching information properly with a clear name.
    await testInfo.attach('search-flow-summary', { 
        body: `Performed search for '${productToSearch}' successfully.` 
    });
});

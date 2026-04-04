import { test, expect } from '@playwright/test';

/**
 * GOOD TEST INFO EXAMPLE
 * 
 * This test demonstrates a proper use of the `testInfo` object to enhance test reporting
 * and handle environmental differences or retries in a clean way.
 * 
 * Why this is a GOOD example:
 * 1. Attaching Contextual Metadata: It uses `testInfo.annotations` to add information 
 *    that helps identify the test's purpose or related ticket in reports.
 * 2. Using Retry Info: It uses `testInfo.retry` to log the current attempt 
 *    or perform extra debug actions in a way that respects linting rules.
 * 3. Dynamic Artifact Naming: It uses `testInfo.outputPath()` to ensure that any 
 *    manually created screenshots or files are stored in the correct directory.
 * 4. Separation of Concerns: The `testInfo` usage is for observability and test management,
 *    not for driving the core business logic of the test itself.
 */

test('Search for products with debug info', async ({ page }, testInfo) => {
    // 1. Add annotations for better reporting (e.g., linking to a Jira ticket)
    testInfo.annotations.push({ type: 'test-id', description: 'PROD-123' });
    testInfo.annotations.push({ type: 'feature', description: 'Search' });

    await page.goto('/');

    // 2. Log retry attempt if applicable
    // We use a console.log that incorporates the retry number directly,
    // avoiding a conditional inside the test block.
    console.log(`[DEBUG] Current attempt: #${testInfo.retry} for test: ${testInfo.title}`);

    // 3. Perform the test actions using stable locators (data-test)
    const searchQuery = page.getByTestId('search-query');
    const searchSubmit = page.getByTestId('search-submit');

    await searchQuery.fill('Hammer');
    await searchSubmit.click();

    // 4. Verification
    const productNames = page.getByTestId('product-name');
    await expect(productNames).toContainText(['Hammer'], { ignoreCase: true });

    // 5. Manually attach a screenshot if the test reaches this point (e.g., for visual audit)
    // We use testInfo.outputPath to get a safe path for the screenshot
    const screenshotPath = testInfo.outputPath('search-results.png');
    await page.screenshot({ path: screenshotPath });
    await testInfo.attach('Final Search Results', { path: screenshotPath, contentType: 'image/png' });
});

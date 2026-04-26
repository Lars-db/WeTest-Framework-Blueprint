import { test } from '../../../support/utils/fixtures/testFixture';
import { expect } from '@playwright/test';

/**
 * GOOD PAGE OBJECT MODEL EXAMPLE
 * 
 * This test demonstrates the best practices for using the Page Object Model (POM) pattern.
 * 
 * Why this is a GOOD example:
 * 1. Separation of Concerns: The test script focuses on the business flow and assertions,
 *    while the Page Object (`HomePage`) handles how to find and interact with elements.
 * 2. Reusability: Common actions like `searchFor` and `goToSignIn` are encapsulated in the Page Object,
 *    allowing them to be reused across multiple tests.
 * 3. Maintenance: If a locator changes (e.g., `search-query` becomes `search-input`), 
 *    you only need to update it in one place (the Page Object).
 * 4. Use of Fixtures: The test uses a custom fixture (`homePage`) for clean dependency injection,
 *    avoiding repetitive instantiation in every test.
 * 5. Robust Locators: The Page Object uses stable `data-test` attributes.
 */

test.describe('Search functionality using POM', () => {
    // For this test I want to be signed out. So no cookies or origins from previous sessions should be loaded.
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should find results for a valid search query', async ({ homePage }) => {
        // Step 1: Use a Page Object method to navigate
        await homePage.goto();

        // Step 2: Use an encapsulated action method
        await homePage.searchFor('Hammer');

        // Step 3: Perform assertions using Page Object properties (locators)
        // This keeps the test readable and expressive.
        await expect(homePage.productNames).toContainText(['Hammer'], { ignoreCase: true });
    });

    test('should navigate to the sign-in page', async ({ homePage, page }) => {
        await homePage.goto();
        
        // Encapsulated navigation logic
        await homePage.goToSignIn();

        // Verification - we expect to be on the auth/login page
        await expect(page).toHaveURL(/.*\/auth\/login/);
    });

});

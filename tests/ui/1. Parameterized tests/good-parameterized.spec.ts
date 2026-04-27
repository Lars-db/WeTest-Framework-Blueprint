import { test, expect } from '@playwright/test';

/**
 * GOOD PARAMETERIZED TEST EXAMPLE
 * 
 * Why this is a GOOD test:
 * 1. Data-Driven: Each test case is defined in a clean array, making it easy to add more scenarios (e.g., more invalid email formats).
 * 2. Independent Tests: It uses .forEach to create a SEPARATE test for each case. If one fails, others still run, and failures are clearly identified by the descriptive test name.
 * 3. Descriptive Test Names: The test title includes the scenario ('email: ${scenario}'), making the test report easy to read.
 * 4. Best Locators: Uses 'data-test' attributes, which are stable and decoupled from the UI's layout/CSS (unlike using class names or raw text that might change with translations).
 * 5. Single Responsibility: Each test iteration focuses on one specific validation error, making it easy to debug.
 */

const contactFormScenarios = [
  {
    scenario: 'empty last name',
    firstName: 'John',
    lastName: '',
    email: 'john@example.com',
    subject: 'webmaster',
    message: 'Hello, this is a message that will contain at least 50 characters.',
    expectedError: 'Last name is required'
  },
  { 
    scenario: 'invalid email format', 
    firstName: 'John', 
    lastName: 'Doe', 
    email: 'invalid-email', 
    subject: 'webmaster', 
    message: 'Hello, this is a message that will contain at least 50 characters.',
    expectedError: 'Email format is invalid'
  },
  { 
    scenario: 'empty message', 
    firstName: 'John', 
    lastName: 'Doe', 
    email: 'john@example.com', 
    subject: 'webmaster', 
    message: '', 
    expectedError: 'Message is required' 
  },
];

test.describe('Contact Form Validation - Good Parameterized', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('[data-test="first-name"]')).toBeVisible();
  });

  contactFormScenarios.forEach(({ scenario, firstName, lastName, email, subject, message, expectedError }) => {
    test(`should show error for ${scenario}`, async ({ page }) => {
      // Fill the form fields using stable 'data-test' locators
      // Ensure we always fill the fields (even with empty string) to be explicit
      await page.locator('[data-test="first-name"]').fill(firstName);
      await page.locator('[data-test="first-name"]').press('Tab');
      await page.locator('[data-test="last-name"]').fill(lastName);
      await page.locator('[data-test="last-name"]').press('Tab');
      await page.locator('[data-test="email"]').fill(email);
      await page.locator('[data-test="email"]').press('Tab');
      await page.locator('[data-test="subject"]').selectOption(subject);
      await page.locator('[data-test="message"]').fill(message);
      await page.locator('[data-test="message"]').press('Tab');

      // Wait for Angular to process all validators before submitting
      await expect(page.locator('form')).toHaveClass(/ng-invalid/);

      const submitButton = page.locator('[data-test="contact-submit"]');
      await submitButton.click();

      // Verify the expected error message is visible
      // Note: We use a locator that targets the error container specifically
      const errorLocator = page.locator('.alert-danger');
      
      await expect(errorLocator).toContainText(expectedError);
    });
  });

});

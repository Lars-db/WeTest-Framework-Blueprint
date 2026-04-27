import { test, expect } from '@playwright/test';

/**
 * BAD PARAMETERIZED TEST EXAMPLE
 * 
 * Why this is a BAD test:
 * 1. Single Test for Multiple Cases: It runs a loop INSIDE a single 'test' block. If one case fails, the entire test stops and other cases won't be executed.
 * 2. Unstable Locators: Uses CSS classes ('.form-control') or indices (e.g., 'nth(0)') instead of stable 'data-test' attributes. If the layout or CSS changes, the test breaks.
 * 3. Poor Performance/State Management: Since all cases run in the same test block without proper reset, errors from one iteration might bleed into the next.
 * 4. Vague Test Names: The report will only show one 'Generic contact test' regardless of which input scenario failed, making debugging much harder.
 * 5. Hardcoded Values: Many things are hardcoded, making it harder to maintain and read.
 */

const data = [
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
    email: 'bad-email', 
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

test.describe('Contact Form Validation - Fixed Parameterized', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('[data-test="first-name"]')).toHaveClass(/ng-pristine/);
  });

  data.forEach(({ scenario, firstName, lastName, email, subject, message, expectedError }) => {
    test(`should show error for ${scenario}`, async ({ page }) => {
      // FIX: Explicitly fill all fields (including empty ones) to avoid residue
      await page.locator('[data-test="first-name"]').fill(firstName);
      await page.locator('[data-test="first-name"]').press('Tab');
      await page.locator('[data-test="last-name"]').fill(lastName);
      await page.locator('[data-test="last-name"]').press('Tab');
      await page.locator('[data-test="email"]').fill(email);
      await page.locator('[data-test="email"]').press('Tab');
      await page.locator('[data-test="subject"]').selectOption(subject);
      await page.locator('[data-test="message"]').fill(message);
      await page.locator('[data-test="message"]').press('Tab');

      await expect(page.locator('form')).toHaveClass(/ng-invalid/);

      // FIX: Using stable 'data-test' locator for submit
      const submitButton = page.locator('[data-test="contact-submit"]');
      await submitButton.click();

      // FIX: Using proper Playwright assertion with better error messaging
      const errorLocator = page.locator('.alert-danger');
      
      await expect(errorLocator).toContainText(expectedError);
    });
  });

});

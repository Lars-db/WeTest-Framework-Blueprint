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
  ['', 'Doe', 'john@example.com', 'webmaster', 'Hello, this is a message that will contain at least 50 characters.', 'First name is required'],
  ['John', 'Doe', 'bad-email', 'webmaster', 'Hello, this is a message that will contain at least 50 characters.', 'Email format is invalid'],
  ['John', 'Doe', 'john@example.com', 'webmaster', '', 'Message is required']
];

test('Generic contact test', async ({ page }) => {
  for (const item of data) {
    await page.goto('/contact');

    // Using unstable, non-descriptive locators (BAD)
    if (item[0]) await page.locator('.form-control').nth(0).fill(item[0]);
    if (item[1]) await page.locator('.form-control').nth(1).fill(item[1]);
    if (item[2]) await page.locator('.form-control').nth(2).fill(item[2]);
    if (item[3]) await page.locator('select').selectOption(item[3]);
    if (item[4]) await page.locator('textarea').fill(item[4]);

    // Hardcoded button locator
    await page.locator('input[type="submit"]').click();

    // Vague assertion
    const error = await page.locator('.alert-danger').textContent();
    expect(error).toContain(item[5]);
  }
});

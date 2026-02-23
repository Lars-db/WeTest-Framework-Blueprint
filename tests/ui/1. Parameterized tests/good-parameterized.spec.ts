
// If you want to have hooks for each test, you can put them inside a describe() - so they are executed for each iteration / each individual test:

import test, { expect } from "@playwright/test";

[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob', expected: 'Hello, Bob!' },
  { name: 'Charlie', expected: 'Hello, Charlie!' },
].forEach(({ name, expected }) => {
  test.describe(() => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`https://example.com/greet?name=${name}`);
    });
    test(`testing with ${expected}`, async ({ page }) => {
      await expect(page.getByRole('heading')).toHaveText(expected);
    });
  });
});



// If you want to have hooks for one specific test, you can put them inside the test() - so they are executed only for that iteration / that individual test:

[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob', expected: 'Hello, Bob!' },
  { name: 'Charlie', expected: 'Hello, Charlie!' },
].forEach(({ name, expected }) => {
  test(`testing with ${name}`, async ({ page }) => {
    await page.goto(`https://example.com/greet?name=${name}`);
    await expect(page.getByRole('heading')).toHaveText(expected);
  });
});
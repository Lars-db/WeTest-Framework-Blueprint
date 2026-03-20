import { test, expect } from '@playwright/test';

/**
 * BAD PLAYWRIGHT AGENT TEST EXAMPLE (Fragile interaction pattern)
 * 
 * Why this is a BAD test:
 * 1. Brittle Selectors: Uses fragile, non-semantic selectors (like .nth(x)) that easily break with UI changes.
 * 2. Hardcoded Delays: Relies on `waitForTimeout` (bad practice!) instead of proper waiting for state changes.
 * 3. Implicit State Knowledge: Assumes exactly where the chat bot "agent" is in its flow without verifying.
 * 4. Vague Assertions: The test has no specific outcome validation other than "something" appeared.
 * 5. Mixing Responsibility: The test combines multiple disconnected chat flows in one block, making failures hard to isolate.
 */

test.describe('Support Chat - Bad Patterns', () => {

  test('generic chat test', async ({ page }) => {
    await page.goto('/');
    
    // BAD: Using fragile button selector
    await page.locator('.chat-toggle-btn').click();
    
    // BAD: Using nth(x) which is extremely fragile if the bot message count changes
    await page.locator('.action-btn').nth(3).click();
    
    // BAD: Hardcoded timeout (huge anti-pattern)
    await page.waitForTimeout(1000);
    
    // BAD: Reliance on input index
    await page.locator('input').nth(1).fill('Agent');
    await page.keyboard.press('Enter');

    // BAD: No proper assertion that we're in the right state
    await page.waitForTimeout(500);
    await page.locator('input').nth(1).fill('bad-email'); // Won't even work if the bot asks for last name first
    await page.keyboard.press('Enter');

    // Vague assertion (BAD)
    const error = page.locator('.chat-message').last();
    expect(error).toBeDefined();
  });

});

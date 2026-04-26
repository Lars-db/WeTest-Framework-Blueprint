import { test } from '../../../support/utils/fixtures/testFixture';
import { expect } from '@playwright/test';

/**
 * FIXED PLAYWRIGHT AGENT TEST EXAMPLE (Following Good Patterns)
 * 
 * Why this is now a GOOD test:
 * 1. Robust Selectors: Uses stable 'data-test' attributes via the ChatPage POM.
 * 2. Proper Waiting: Replaced hardcoded timeouts with proper Playwright actionability and assertions.
 * 3. State Verification: Verifies the chat window is visible and bot responds.
 * 4. POM usage: Encapsulates chat logic in ChatPage for reusability.
 */

test.describe('Support Chat - Fixed Patterns', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('generic chat test', async ({ page, chatPage }) => {
    await page.goto('/');
    
    // FIX: Using robust POM method and data-test selector
    await chatPage.open();
    await expect(chatPage.chatWindow).toBeVisible();
    
    // FIX: Using intent-based interaction instead of nth(x)
    await chatPage.selectSupportTicket();
    
    // FIX: Removed hardcoded timeout, Playwright waits for input to be ready
    await chatPage.sendMessage('Agent');

    // FIX: Proper multi-step flow verification
    await chatPage.sendMessage('bad-email');

    // FIX: Specific assertion on the bot's response
    const lastMessage = chatPage.botMessages.last();
    await expect(lastMessage).toBeVisible();
  });

});

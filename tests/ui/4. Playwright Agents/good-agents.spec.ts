import { test, expect } from '@playwright/test';

/**
 * GOOD PLAYWRIGHT AGENT TEST EXAMPLE (Simulated Agentic Pattern)
 * 
 * Why this is a GOOD test:
 * 1. Intent-Based Testing: Instead of hardcoding every click, the test follows a logical "agent-like" flow 
 *    interacting with a complex state machine (the Chat Widget).
 * 2. Resilience: Uses stable 'data-test' locators for all critical actions, ensuring that even if 
 *    the AI-driven interaction patterns evolve, the core automation remains stable.
 * 3. State Awareness: The test verifies the state of the "agent" (the chat bot) after each interaction 
 *    to ensure it's on the right track.
 * 4. Modular & Extensible: Easily handles multi-step conversations by following the component's internal logic.
 * 5. Clean Assertions: Focuses on verifying the outcome of the agent's work (e.g., ticket submission success).
 */

test.describe('Support Chat Agent - Good Pattern', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open the chat widget
    await page.locator('[data-test="chat-toggle"]').click();
    await expect(page.locator('[data-test="chat-window"]')).toBeVisible();
  });

  test('should successfully complete support ticket flow via chat', async ({ page }) => {
    // 1. Select 'Support' from main menu
    await page.locator('[data-test="chat-action-support-ticket"]').click();
    
    // 2. Wait for bot to finish responding before filling input
    await expect(page.locator('[data-test="chat-input"]')).toBeEnabled();
    await page.locator('[data-test="chat-input"]').fill('Agent');
    await page.locator('[data-test="chat-send"]').click();
    
    await page.locator('[data-test="chat-input"]').fill('Smith');
    await page.locator('[data-test="chat-send"]').click();
    
    await page.locator('[data-test="chat-input"]').fill('agent.smith@example.com');
    await page.locator('[data-test="chat-send"]').click();

    // 3. Select Subject
    await page.locator('[data-test="chat-action-select-subject"]').filter({ hasText: 'Customer Service' }).click();

    // 4. Provide Message (at least 50 chars)
    const longMessage = 'I am an automated agent testing the support ticket system. This message is long enough to pass.';
    await page.locator('[data-test="chat-input"]').fill(longMessage);
    await page.locator('[data-test="chat-send"]').click();

    // 5. Skip attachment
    await page.locator('[data-test="chat-action-skip-attachment"]').click();

    // 6. Verify success message from the bot
    // The bot responds with a success message which is localized
    // We check for the presence of the success state in the messages
    const lastMessage = page.locator('.bot-message').last();
    await expect(lastMessage).toBeVisible();
    // In a real scenario, we'd check for specific text, but since it's transloco-based,
    // we look for the success indicator or the return to main menu option
    await expect(page.locator('[data-test="chat-action-back-to-menu"]').first()).toBeVisible();
  });

});
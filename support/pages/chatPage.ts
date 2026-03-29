import { type Locator, Page } from '@playwright/test';

export class ChatPage {
    readonly page: Page;
    readonly toggleButton: Locator;
    readonly chatWindow: Locator;
    readonly supportTicketButton: Locator;
    readonly chatInput: Locator;
    readonly sendButton: Locator;
    readonly selectSubjectButton: Locator;
    readonly skipAttachmentButton: Locator;
    readonly backToMenuButton: Locator;
    readonly botMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toggleButton = page.locator('[data-test="chat-toggle"]');
        this.chatWindow = page.locator('[data-test="chat-window"]');
        this.supportTicketButton = page.locator('[data-test="chat-action-support-ticket"]');
        this.chatInput = page.locator('[data-test="chat-input"]');
        this.sendButton = page.locator('[data-test="chat-send"]');
        this.selectSubjectButton = page.locator('[data-test="chat-action-select-subject"]');
        this.skipAttachmentButton = page.locator('[data-test="chat-action-skip-attachment"]');
        this.backToMenuButton = page.locator('[data-test="chat-action-back-to-menu"]');
        this.botMessages = page.locator('.bot-message');
    }

    async open() {
        await this.toggleButton.click();
    }

    async sendMessage(message: string) {
        await this.chatInput.fill(message);
        await this.sendButton.click();
    }

    async selectSupportTicket() {
        await this.supportTicketButton.click();
    }

    async selectSubject(subject: string) {
        await this.selectSubjectButton.filter({ hasText: subject }).click();
    }

    async skipAttachment() {
        await this.skipAttachmentButton.click();
    }
}

import { type Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ChatPage extends BasePage {
    readonly toggleButton: Locator;
    readonly chatWindow: Locator;
    readonly supportTicketButton: Locator;
    readonly chatInput: Locator;
    readonly sendButton: Locator;
    readonly selectSubjectButton: Locator;
    readonly skipAttachmentButton: Locator;
    readonly backToMenuButton: Locator;
    readonly botMessages: Locator;

    constructor(page: Page, language?: string) {
        super(page, language);
        const t = this.t.chatPage;

        this.toggleButton = this.page.getByTestId('chat-toggle');
        this.chatWindow = this.page.getByTestId('chat-window');
        this.supportTicketButton = this.page.getByTestId('chat-action-support-ticket');
        this.chatInput = this.page.getByTestId('chat-input');
        this.sendButton = this.page.getByTestId('chat-send');
        this.selectSubjectButton = this.page.getByTestId('chat-action-select-subject');
        this.skipAttachmentButton = this.page.getByTestId('chat-action-skip-attachment');
        this.backToMenuButton = this.page.getByTestId('chat-action-back-to-menu');
        this.botMessages = this.page.locator('.bot-message');
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
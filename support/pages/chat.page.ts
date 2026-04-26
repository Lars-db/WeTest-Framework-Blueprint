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

        this.toggleButton = this.page.getByRole('button', { name: t.toggleButton });
        this.chatWindow = this.page.getByRole('dialog', { name: t.chatWindow });
        this.supportTicketButton = this.page.getByRole('button', { name: t.supportTicketButton });
        this.chatInput = this.page.getByRole('textbox', { name: t.chatInput });
        this.sendButton = this.page.getByRole('button', { name: t.sendButton });
        this.selectSubjectButton = this.page.getByRole('button', { name: t.selectSubjectButton });
        this.skipAttachmentButton = this.page.getByRole('button', { name: t.skipAttachmentButton });
        this.backToMenuButton = this.page.getByRole('button', { name: t.backToMenuButton });
        this.botMessages = this.page.getByRole('log', { name: t.botMessage });
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
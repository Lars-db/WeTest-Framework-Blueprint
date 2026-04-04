import { type Locator, Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

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

    constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;
        const t = getTranslations(language).chatPage;

        this.toggleButton = page.getByRole('button', { name: t.toggleButton });
        this.chatWindow = page.getByRole('dialog', { name: t.chatWindow });
        this.supportTicketButton = page.getByRole('button', { name: t.supportTicketButton });
        this.chatInput = page.getByRole('textbox', { name: t.chatInput });
        this.sendButton = page.getByRole('button', { name: t.sendButton });
        this.selectSubjectButton = page.getByRole('button', { name: t.selectSubjectButton });
        this.skipAttachmentButton = page.getByRole('button', { name: t.skipAttachmentButton });
        this.backToMenuButton = page.getByRole('button', { name: t.backToMenuButton });
        this.botMessages = page.getByRole('log', { name: t.botMessage });
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

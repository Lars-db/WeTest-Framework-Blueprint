export interface ElementTranslations {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
        loginSubmitButton: string;
        loginError: string;
    };
    homePage: {
        searchQueryInput: string;
        searchSubmitButton: string;
        signInLink: string;
        productName: string;
    };
    sharedComponents: {
        header: string;
        footer: string;
    };
    chatPage: {
        toggleButton: string;
        chatWindow: string;
        supportTicketButton: string;
        chatInput: string;
        sendButton: string;
        selectSubjectButton: string;
        skipAttachmentButton: string;
        backToMenuButton: string;
        botMessage: string;
    };
}

export const translations: Record<string, ElementTranslations> = {
    en: {
        loginPage: {
            usernameInput: 'Username',
            passwordInput: 'Password',
            loginSubmitButton: 'Login',
            loginError: 'Login Error',
        },
        homePage: {
            searchQueryInput: 'Search',
            searchSubmitButton: 'Search',
            signInLink: 'Sign In',
            productName: 'Product Name',
        },
        sharedComponents: {
            header: 'Header',
            footer: 'Footer',
        },
        chatPage: {
            toggleButton: 'Chat Toggle',
            chatWindow: 'Chat Window',
            supportTicketButton: 'Support Ticket',
            chatInput: 'Chat Input',
            sendButton: 'Send',
            selectSubjectButton: 'Select Subject',
            skipAttachmentButton: 'Skip Attachment',
            backToMenuButton: 'Back to Menu',
            botMessage: 'Bot Message',
        },
    },
    gr: {
        loginPage: {
            usernameInput: 'Όνομα χρήστη',
            passwordInput: 'Κωδικός πρόσβασης',
            loginSubmitButton: 'Σύνδεση',
            loginError: 'Σφάλμα σύνδεσης',
        },
        homePage: {
            searchQueryInput: 'Αναζήτηση',
            searchSubmitButton: 'Αναζήτηση',
            signInLink: 'Σύνδεση',
            productName: 'Όνομα προϊόντος',
        },
        sharedComponents: {
            header: 'Κεφαλίδα',
            footer: 'Υποσέλιδο',
        },
        chatPage: {
            toggleButton: 'Εναλλαγή συνομιλίας',
            chatWindow: 'Παράθυρο συνομιλίας',
            supportTicketButton: 'Εισιτήριο υποστήριξης',
            chatInput: 'Είσοδος συνομιλίας',
            sendButton: 'Αποστολή',
            selectSubjectButton: 'Επιλέξτε θέμα',
            skipAttachmentButton: 'Παράλειψη συνημμένου',
            backToMenuButton: 'Επιστροφή στο μενού',
            botMessage: 'Μήνυμα ρομπότ',
        },
    },
};

export function getTranslations(language: string): ElementTranslations {
    return translations[language];
}
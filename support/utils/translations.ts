export interface ElementTranslations {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
    };
    sharedComponents: {
        header: string;
        footer: string;
    };
}

export const translations: Record<string, ElementTranslations> = {
    en: {
        loginPage: {
            usernameInput: 'Username',
            passwordInput: 'Password',
        },
        sharedComponents: {
            header: 'Header',
            footer: 'Footer',
        },
    },
    gr: {
        loginPage: {
            usernameInput: 'Όνομα χρήστη',
            passwordInput: 'Κωδικός πρόσβασης',
        },
        sharedComponents: {
            header: 'Κεφαλίδα',
            footer: 'Υποσέλιδο',
        },
    },
};

export function getTranslations(language: string): ElementTranslations {
    return translations[language];
}
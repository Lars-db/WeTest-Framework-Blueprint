export interface ElementTranslations {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
    };
    homePage: {
        searchQueryInput: string;
        searchSubmitButton: string;
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
        homePage: {
            searchQueryInput: 'Search',
            searchSubmitButton: 'Search',
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
        homePage: {
            searchQueryInput: 'Αναζήτηση',
            searchSubmitButton: 'Αναζήτηση',
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
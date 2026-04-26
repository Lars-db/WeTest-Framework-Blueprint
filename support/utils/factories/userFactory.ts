/**
 * FACTORY PATTERN — UserFactory
 *
 * Problem it solves: test credentials for known accounts are copy-pasted across
 * specs. When a password changes, every file breaks. The factory is the single
 * source of truth for pre-seeded accounts.
 *
 * Usage:
 *   const creds = UserFactory.customer();      // { email, password }
 *   const creds = UserFactory.admin();
 *   const token = await UserFactory.token(request, 'customer');
 */
import { APIRequestContext } from '@playwright/test';

export type Credentials = {
    email: string;
    password: string;
};

export type UserRole = 'customer' | 'admin';

export class UserFactory {
    static customer(): Credentials {
        return {
            email: 'customer@practicesoftwaretesting.com',
            password: 'welcome01',
        };
    }

    static admin(): Credentials {
        return {
            email: 'admin@practicesoftwaretesting.com',
            password: 'welcome01',
        };
    }

    static byRole(role: UserRole): Credentials {
        return role === 'admin' ? UserFactory.admin() : UserFactory.customer();
    }

    /**
     * Facade convenience: log in and return the Bearer token in one call.
     * Keeps test bodies free of login boilerplate when a token is all that's needed.
     */
    static async token(request: APIRequestContext, role: UserRole = 'customer'): Promise<string> {
        const credentials = UserFactory.byRole(role);
        const response = await request.post(
            process.env.API_BASE_URL! + process.env.USERS_ENDPOINT + '/login',
            { data: credentials }
        );
        const body = await response.json();
        return body.access_token as string;
    }
}

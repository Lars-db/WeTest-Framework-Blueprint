import { test, expect } from '@playwright/test';
import { HttpStatus } from '../../support/enums/httpStatus';
import { UsersApi } from '../../support/api/usersApi';

const VALID_USER = {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
};

test.describe('Users API', () => {
    test.use({ baseURL: process.env.API_BASE_URL! });

    test.describe('POST /users/login', () => {
        test('returns a bearer token for valid credentials', async ({ request }) => {
            const users = new UsersApi(request);

            const response = await test.step('Send POST /users/login with valid credentials', () =>
                users.login(VALID_USER)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response contains access_token', async () => {
                const body = await response.json();
                expect(body).toMatchObject({
                    access_token: expect.any(String),
                    token_type: 'Bearer',
                    expires_in: expect.any(Number),
                });
            });
        });

        test('returns 401 for invalid credentials', async ({ request }) => {
            const users = new UsersApi(request);

            const response = await test.step('Send POST /users/login with wrong password', () =>
                users.login({ email: VALID_USER.email, password: 'wrong-password' })
            );

            await test.step('Assert status 401', () => {
                expect(response.status()).toBe(HttpStatus.UNAUTHORIZED);
            });
        });

        test('returns 422 when required fields are missing', async ({ request }) => {
            const users = new UsersApi(request);

            const response = await test.step('Send POST /users/login without password', () =>
                users.register({ first_name: 'x', email: VALID_USER.email })
            );

            await test.step('Assert status 422', () => {
                expect(response.status()).toBe(422);
            });
        });
    });

    test.describe('GET /users/me', () => {
        test('returns the authenticated user profile', async ({ request }) => {
            const users = new UsersApi(request);

            const token = await test.step('Login and obtain access token', async () => {
                const res = await users.login(VALID_USER);
                const body = await res.json();
                return body.access_token as string;
            });

            const response = await test.step('Send GET /users/me with bearer token', () =>
                users.getMe(token)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response contains user profile', async () => {
                const body = await response.json();
                expect(body).toMatchObject({
                    email: VALID_USER.email,
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                });
            });
        });

        test('returns 401 without a token', async ({ request }) => {
            const users = new UsersApi(request);

            const response = await test.step('Send GET /users/me without auth', () =>
                users.getMeUnauthorized()
            );

            await test.step('Assert status 401', () => {
                expect(response.status()).toBe(HttpStatus.UNAUTHORIZED);
            });
        });
    });

    test.describe('POST /users/register', () => {
        test('registers a new user and returns 201', async ({ request }) => {
            const users = new UsersApi(request);
            const email = `test.user.${Date.now()}@example.com`;

            const response = await test.step('Send POST /users/register with valid payload', () =>
                users.register({
                    first_name: 'Test',
                    last_name: 'User',
                    email,
                    password: 'SuperSecure@123',
                    dob: '1990-01-01',
                })
            );

            await test.step('Assert status 201', () => {
                expect(response.status()).toBe(HttpStatus.CREATED);
            });
        });

        test('returns 422 when required fields are missing', async ({ request }) => {
            const users = new UsersApi(request);

            const response = await test.step('Send POST /users/register with only first_name', () =>
                users.register({ first_name: 'Test', email: '' })
            );

            await test.step('Assert status 422', () => {
                expect(response.status()).toBe(422);
            });
        });

        test('returns 422 for duplicate email', async ({ request }) => {
            const users = new UsersApi(request);

            const response = await test.step('Send POST /users/register with existing email', () =>
                users.register({
                    first_name: 'Test',
                    last_name: 'User',
                    email: VALID_USER.email,
                    password: 'SuperSecure@123',
                    dob: '1990-01-01',
                })
            );

            await test.step('Assert status 422', () => {
                expect(response.status()).toBe(422);
            });
        });
    });

    test.describe('GET /users/logout', () => {
        test('invalidates the token and returns 200', async ({ request }) => {
            const users = new UsersApi(request);

            const token = await test.step('Login and obtain access token', async () => {
                const res = await users.login(VALID_USER);
                const body = await res.json();
                return body.access_token as string;
            });

            const response = await test.step('Send GET /users/logout with bearer token', () =>
                users.logout(token)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });
        });
    });
});

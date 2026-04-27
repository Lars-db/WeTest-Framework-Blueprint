import { expect, test } from '@playwright/test';
import { HttpStatus } from '../../support/enums/httpStatus';
import { UserApiHelper } from '../../support/utils/helpers/apiHelpers/userApiHelper';
import { UserBuilder } from '../../support/utils/builders/userBuilder';
import { AdminAuthStrategy, AuthStrategy, CustomerAuthStrategy } from '../../support/utils/strategies/authStrategy';
import { UserFactory, UserRole } from '../../support/utils/factories/userFactory';

/**
 * BUILDER PATTERN — UserBuilder
 *
 * Problem: registering a user requires 10+ fields. Without a builder every test
 * repeats a large object literal. Changing a default (e.g. password policy)
 * means updating every test.
 *
 * Solution: UserBuilder provides sensible defaults. Each test only overrides
 * the fields relevant to what it is verifying.
 */

/**
 * WITHOUT BUILDER — every test carries the full object.
 *
 * Downsides:
 * 1. All 10+ fields repeated in every test — noise hides the intent.
 * 2. Password policy changes → update every inline object across every file.
 * 3. Reader must scan the whole object to spot what this test actually cares about.
 * 4. Copy-paste errors silently propagate wrong defaults.
 */
test.describe('User registration — without Builder (bad)', () => {
    let createdId: string;

    test.afterEach(async ({ request }) => {
        if (!createdId) return;
        const token = await new AdminAuthStrategy().getToken(request);
        await UserApiHelper.delete(request, createdId, token);
        createdId = '';
    });

    test('registers a user with a custom name — BAD: full object repeated', async ({ request }) => {
        const result = await UserApiHelper.register(request, {
            first_name: 'Alice',       // ← the only field this test cares about
            last_name: 'Smith',        // ← and this one
            email: `alice.smith+${Date.now()}@example.com`,
            password: 'WeT3st!Fr@mework2026',
            dob: '1990-01-01',
            phone: '0612345678',
            address: {
                street: 'Test Street 1',
                city: 'Amsterdam',
                state: 'Noord-Holland',
                country: 'Netherlands',
                postal_code: '1234AB',
            },
        });

        expect(result.status).toBe(HttpStatus.CREATED);
        createdId = result.body.id;
    });

});

/**
 * WITH BUILDER — each test states only what it cares about.
 */
test.describe('User registration — Builder pattern (good)', () => {
    let createdId: string;

    test.afterEach(async ({ request }) => {
        if (!createdId) return;
        const token = await new AdminAuthStrategy().getToken(request);
        await UserApiHelper.delete(request, createdId, token);
        createdId = '';
    });

    test('registers a user with default payload', async ({ request }) => {
        const result = await UserApiHelper.register(request, new UserBuilder().build());
        expect(result.status).toBe(HttpStatus.CREATED);
        createdId = result.body.id;
    });

    test('registers a user with a custom name and address', async ({ request }) => {
        const payload = new UserBuilder()
            .withFirstName('Alice')
            .withLastName('Smith')
            .withAddress('Elm Street 7', 'Rotterdam')
            .build();

        const result = await UserApiHelper.register(request, payload);
        expect(result.status).toBe(HttpStatus.CREATED);
        createdId = result.body.id;
    });

    test('rejects a duplicate email with 422', async ({ request }) => {
        const payload = new UserBuilder()
            .withEmail('customer@practicesoftwaretesting.com')
            .build();

        const result = await UserApiHelper.register(request, payload);
        expect(result.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    });

});

/**
 * STRATEGY PATTERN — AuthStrategy
 *
 * Problem: some endpoints behave differently depending on the caller's role.
 * Without a strategy, the role decision (which credentials to use, how to get a
 * token) bleeds into every test that needs authentication.
 *
 * Solution: AuthStrategy encapsulates how each role acquires a token. Swapping
 * roles is a one-line change. The test body stays identical.
 */

/**
 * WITHOUT STRATEGY — token acquisition logic duplicated in every test.
 *
 * Downsides:
 * 1. Login URL, credentials, and header construction repeated in every test.
 * 2. Switching a test to a different role means touching multiple lines.
 * 3. If the login flow changes (e.g. MFA added), every test breaks.
 * 4. Test intent — "can customer delete?" — buried under auth boilerplate.
 */
test.describe('User deletion — without Strategy (bad)', () => {
    let userId: string;

    test.beforeEach(async ({ request }) => {
        const result = await UserApiHelper.register(request, new UserBuilder().build());
        userId = result.body.id;
    });

    test.afterEach(async ({ request }) => {
        if (!userId) return;
        const loginResponse = await request.post(
            `${process.env.API_BASE_URL}${process.env.USERS_ENDPOINT}/login`,
            { data: { email: 'admin@practicesoftwaretesting.com', password: 'welcome01' } },
        );
        const { access_token } = await loginResponse.json();
        await UserApiHelper.delete(request, userId, access_token).catch(() => {});
        userId = '';
    });

    test('admin can delete a user — BAD: auth logic inline', async ({ request }) => {
        const loginResponse = await request.post(
            `${process.env.API_BASE_URL}${process.env.USERS_ENDPOINT}/login`,
            { data: { email: 'admin@practicesoftwaretesting.com', password: 'welcome01' } },
        );
        const { access_token } = await loginResponse.json();

        const result = await UserApiHelper.delete(request, userId, access_token);
        expect(result.status).toBe(HttpStatus.NO_CONTENT);
        userId = '';
    });

    test('customer cannot delete a user — BAD: auth logic inline', async ({ request }) => {
        const loginResponse = await request.post(
            `${process.env.API_BASE_URL}${process.env.USERS_ENDPOINT}/login`,
            { data: { email: 'customer@practicesoftwaretesting.com', password: 'welcome01' } },
        );
        const { access_token } = await loginResponse.json();

        const result = await UserApiHelper.delete(request, userId, access_token);
        expect(result.status).toBe(HttpStatus.FORBIDDEN);
    });

});

/**
 * WITH STRATEGY — role decision isolated behind an interface.
 * Swap `new AdminAuthStrategy()` ↔ `new CustomerAuthStrategy()` to change role.
 * The login flow lives in one place only.
 */
const roles: { role: UserRole; strategy: AuthStrategy }[] = [
    { role: 'customer', strategy: new CustomerAuthStrategy() },
    { role: 'admin',    strategy: new AdminAuthStrategy()    },
];

test.describe('User profile — Strategy pattern', () => {

    roles.forEach(({ role, strategy }) => {
        test(`${role} retrieves own profile`, async ({ request }) => {
            const token = await strategy.getToken(request);

            const { body: profile } = await test.step(`GET /users/me as ${role}`, async () => {
                const result = await UserApiHelper.getMe(request, token);
                expect(result.status).toBe(HttpStatus.OK);
                return result;
            });

            await test.step('Verify correct user returned', async () => {
                expect(profile.email).toBe(UserFactory.byRole(role).email);
            });
        });
    });

});

test.describe('User deletion — Strategy pattern (role-restricted endpoint)', () => {
    let userId: string;

    test.beforeEach(async ({ request }) => {
        const result = await UserApiHelper.register(request, new UserBuilder().build());
        userId = result.body.id;
    });

    test.afterEach(async ({ request }) => {
        if (!userId) return;
        const token = await new AdminAuthStrategy().getToken(request);
        await UserApiHelper.delete(request, userId, token).catch(() => {});
        userId = '';
    });

    test('admin can delete a user', async ({ request }) => {
        const strategy: AuthStrategy = new AdminAuthStrategy();

        await test.step('DELETE /users/:id as admin', async () => {
            const token = await strategy.getToken(request);
            const result = await UserApiHelper.delete(request, userId, token);
            expect(result.status).toBe(HttpStatus.NO_CONTENT);
            userId = '';
        });
    });

    test('customer cannot delete a user', async ({ request }) => {
        const strategy: AuthStrategy = new CustomerAuthStrategy();

        await test.step('DELETE /users/:id as customer — expect 403', async () => {
            const token = await strategy.getToken(request);
            const result = await UserApiHelper.delete(request, userId, token);
            expect(result.status).toBe(HttpStatus.FORBIDDEN);
        });
    });

});

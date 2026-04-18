import { expect, test } from '@playwright/test';
import { HttpStatus } from '../../support/enums/httpStatus';
import { BrandsApi } from '../../support/api/brandsApi';
import { UsersApi } from '../../support/api/usersApi';

const ADMIN_USER = {
    email: 'admin@practicesoftwaretesting.com',
    password: 'welcome01',
};

test.describe('Brands API', () => {
    test.use({ baseURL: process.env.API_BASE_URL! });

    test.describe('GET /brands', () => {
        test('returns an array of brands', async ({ request }) => {
            const brands = new BrandsApi(request);

            const response = await test.step('Send GET /brands', () =>
                brands.getAll()
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response is a non-empty array of brand objects', async () => {
                const body = await response.json();
                expect(Array.isArray(body)).toBe(true);
                expect(body.length).toBeGreaterThan(0);
                expect(body[0]).toMatchObject({
                    id: expect.any(String),
                    name: expect.any(String),
                    slug: expect.any(String),
                });
            });
        });
    });

    test.describe('GET /brands/{brandId}', () => {
        test('returns a single brand by ID', async ({ request }) => {
            const brands = new BrandsApi(request);

            const brandId = await test.step('Fetch first brand ID', async () => {
                const res = await brands.getAll();
                const body = await res.json();
                return body[0].id as string;
            });

            const response = await test.step(`Send GET /brands/${brandId}`, () =>
                brands.getById(brandId)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response matches brand shape', async () => {
                expect(await response.json()).toMatchObject({
                    id: brandId,
                    name: expect.any(String),
                    slug: expect.any(String),
                });
            });
        });

        test('returns 404 for a non-existent brand ID', async ({ request }) => {
            const brands = new BrandsApi(request);

            const response = await test.step('Send GET /brands/non-existent-id', () =>
                brands.getById('non-existent-id')
            );

            await test.step('Assert status 404', () => {
                expect(response.status()).toBe(HttpStatus.NOT_FOUND);
            });
        });
    });

    test.describe('GET /brands/search', () => {
        test('returns brands matching the search query', async ({ request }) => {
            const brands = new BrandsApi(request);

            const response = await test.step('Send GET /brands/search?q=a', () =>
                brands.search('a')
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response is an array', async () => {
                expect(Array.isArray(await response.json())).toBe(true);
            });
        });

        test('returns empty array for a query with no matches', async ({ request }) => {
            const brands = new BrandsApi(request);

            const response = await test.step('Send GET /brands/search?q=zzznomatchzzz', () =>
                brands.search('zzznomatchzzz')
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response is an empty array', async () => {
                expect(await response.json()).toEqual([]);
            });
        });
    });

    test.describe('POST /brands', () => {
        test('creates a new brand and returns 201', async ({ request }) => {
            const brands = new BrandsApi(request);
            const slug = `test-brand-${Date.now()}`;

            const response = await test.step('Send POST /brands', () =>
                brands.create({ name: 'Test Brand', slug })
            );

            await test.step('Assert status 201', () => {
                expect(response.status()).toBe(HttpStatus.CREATED);
            });

            await test.step('Assert response contains new brand', async () => {
                expect(await response.json()).toMatchObject({
                    id: expect.any(String),
                    name: 'Test Brand',
                    slug,
                });
            });
        });

        test('returns 422 when required fields are missing', async ({ request }) => {
            const brands = new BrandsApi(request);

            const response = await test.step('Send POST /brands with empty body', () =>
                brands.create({ name: '', slug: '' })
            );

            await test.step('Assert status 422', () => {
                expect(response.status()).toBe(422);
            });
        });
    });

    test.describe('PUT /brands/{brandId}', () => {
        test('updates a brand and returns 200', async ({ request }) => {
            const brands = new BrandsApi(request);

            const brandId = await test.step('Create a brand to update', async () => {
                const res = await brands.create({ name: 'Brand To Update', slug: `brand-update-${Date.now()}` });
                const body = await res.json();
                return body.id as string;
            });

            const response = await test.step(`Send PUT /brands/${brandId}`, () =>
                brands.update(brandId, { name: 'Updated Brand Name', slug: `updated-brand-${Date.now()}` })
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });
        });
    });

    test.describe('DELETE /brands/{brandId}', () => {
        test('deletes a brand with admin auth and returns 204', async ({ request }) => {
            const brands = new BrandsApi(request);
            const users = new UsersApi(request);

            const token = await test.step('Authenticate as admin', async () => {
                const res = await users.login(ADMIN_USER);
                const body = await res.json();
                return body.access_token as string;
            });

            const brandId = await test.step('Create a brand to delete', async () => {
                const res = await brands.create({ name: 'Brand To Delete', slug: `brand-delete-${Date.now()}` });
                const body = await res.json();
                return body.id as string;
            });

            const response = await test.step(`Send DELETE /brands/${brandId}`, () =>
                brands.delete(brandId, token)
            );

            await test.step('Assert status 204', () => {
                expect(response.status()).toBe(HttpStatus.NO_CONTENT);
            });
        });

        test('returns 401 when no auth token is provided', async ({ request }) => {
            const brands = new BrandsApi(request);

            const brandId = await test.step('Create a brand', async () => {
                const res = await brands.create({ name: 'Brand No Auth', slug: `brand-noauth-${Date.now()}` });
                const body = await res.json();
                return body.id as string;
            });

            const response = await test.step(`Send DELETE /brands/${brandId} without auth`, () =>
                brands.deleteUnauthorized(brandId)
            );

            await test.step('Assert status 401', () => {
                expect(response.status()).toBe(HttpStatus.UNAUTHORIZED);
            });
        });
    });
});

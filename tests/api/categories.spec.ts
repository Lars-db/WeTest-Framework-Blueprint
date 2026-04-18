import { test, expect } from '@playwright/test';
import { HttpStatus } from '../../support/enums/httpStatus';
import { CategoriesApi } from '../../support/api/categoriesApi';

test.describe('Categories API', () => {
    test.use({ baseURL: process.env.API_BASE_URL! });

    test.describe('GET /categories', () => {
        test('returns a flat list of categories', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const response = await test.step('Send GET /categories', () =>
                categories.getAll()
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response is a non-empty array of category objects', async () => {
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

    test.describe('GET /categories/tree', () => {
        test('returns categories with nested sub_categories', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const response = await test.step('Send GET /categories/tree', () =>
                categories.getTree()
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response is an array with nested sub_categories', async () => {
                const body = await response.json();
                expect(Array.isArray(body)).toBe(true);
                const withChildren = body.find((c: { sub_categories: unknown[] }) => c.sub_categories?.length > 0);
                if (withChildren) {
                    expect(withChildren.sub_categories[0]).toMatchObject({
                        id: expect.any(String),
                        name: expect.any(String),
                    });
                }
            });
        });
    });

    test.describe('GET /categories/tree/{categoryId}', () => {
        test('returns a single category tree by ID', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const categoryId = await test.step('Fetch first category ID', async () => {
                const res = await categories.getAll();
                const body = await res.json();
                return body[0].id as string;
            });

            const response = await test.step(`Send GET /categories/tree/${categoryId}`, () =>
                categories.getTreeById(categoryId)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response matches category shape', async () => {
                expect(await response.json()).toMatchObject({
                    id: categoryId,
                    name: expect.any(String),
                });
            });
        });

        test('returns 404 for a non-existent category ID', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const response = await test.step('Send GET /categories/tree/non-existent-id', () =>
                categories.getTreeById('non-existent-id')
            );

            await test.step('Assert status 404', () => {
                expect(response.status()).toBe(HttpStatus.NOT_FOUND);
            });
        });
    });

    test.describe('GET /categories/search', () => {
        test('returns categories matching the search query', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const response = await test.step('Send GET /categories/search?q=hand', () =>
                categories.search('hand')
            );

            await test.step('Assert status 200 and response is an array', async () => {
                expect(response.status()).toBe(HttpStatus.OK);
                expect(Array.isArray(await response.json())).toBe(true);
            });
        });

        test('returns empty array for a query with no matches', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const response = await test.step('Send GET /categories/search?q=zzznomatchzzz', () =>
                categories.search('zzznomatchzzz')
            );

            await test.step('Assert status 200 and response is empty', async () => {
                expect(response.status()).toBe(HttpStatus.OK);
                expect(await response.json()).toEqual([]);
            });
        });
    });

    test.describe('POST /categories', () => {
        test('creates a new category and returns 201', async ({ request }) => {
            const categories = new CategoriesApi(request);
            const slug = `test-category-${Date.now()}`;

            const response = await test.step('Send POST /categories', () =>
                categories.create({ name: 'Test Category', slug })
            );

            await test.step('Assert status 201', () => {
                expect(response.status()).toBe(HttpStatus.CREATED);
            });

            await test.step('Assert response contains new category', async () => {
                expect(await response.json()).toMatchObject({
                    id: expect.any(String),
                    name: 'Test Category',
                    slug,
                });
            });
        });

        test('returns 422 when required fields are missing', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const response = await test.step('Send POST /categories with empty body', () =>
                categories.createWithEmptyBody()
            );

            await test.step('Assert status 422', () => {
                expect(response.status()).toBe(422);
            });
        });
    });

    test.describe('PUT /categories/{categoryId}', () => {
        test('updates a category and returns 200', async ({ request }) => {
            const categories = new CategoriesApi(request);

            const categoryId = await test.step('Create a category to update', async () => {
                const res = await categories.create({ name: 'Category To Update', slug: `cat-update-${Date.now()}` });
                const body = await res.json();
                return body.id as string;
            });

            const response = await test.step(`Send PUT /categories/${categoryId}`, () =>
                categories.update(categoryId, { name: 'Updated Category', slug: `updated-cat-${Date.now()}` })
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });
        });
    });
});

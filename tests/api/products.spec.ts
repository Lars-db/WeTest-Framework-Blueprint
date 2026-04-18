import { test, expect } from '@playwright/test';
import { HttpStatus } from '../../support/enums/httpStatus';
import { ProductsApi } from '../../support/api/productsApi';
import { CategoriesApi } from '../../support/api/categoriesApi';
import { BrandsApi } from '../../support/api/brandsApi';

test.describe('Products API', () => {
    test.use({ baseURL: process.env.API_BASE_URL! });

    test.describe('GET /products', () => {
        test('returns paginated product list', async ({ request }) => {
            const products = new ProductsApi(request);

            const response = await test.step('Send GET /products', () =>
                products.getAll()
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert paginated response shape', async () => {
                const body = await response.json();
                expect(body).toMatchObject({
                    data: expect.any(Array),
                    current_page: expect.any(Number),
                    total: expect.any(Number),
                });
                expect(body.data.length).toBeGreaterThan(0);
            });
        });

        test('filters products by category_id query param', async ({ request }) => {
            const products = new ProductsApi(request);
            const categories = new CategoriesApi(request);

            const categoryId = await test.step('Fetch first category ID', async () => {
                const res = await categories.getAll();
                const body = await res.json();
                return body[0].id as string;
            });

            const response = await test.step(`Send GET /products?by_category_id=${categoryId}`, () =>
                products.getAll({ by_category_id: categoryId })
            );

            await test.step('Assert status 200 and data field present', async () => {
                expect(response.status()).toBe(HttpStatus.OK);
                const body = await response.json();
                expect(body.data).toBeDefined();
            });
        });
    });

    test.describe('GET /products/{productId}', () => {
        test('returns a single product with brand and category', async ({ request }) => {
            const products = new ProductsApi(request);

            const productId = await test.step('Fetch first product ID', async () => {
                const res = await products.getAll();
                const { data } = await res.json();
                return data[0].id as string;
            });

            const response = await test.step(`Send GET /products/${productId}`, () =>
                products.getById(productId)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response matches product shape', async () => {
                expect(await response.json()).toMatchObject({
                    id: productId,
                    name: expect.any(String),
                    price: expect.any(Number),
                });
            });
        });

        test('returns 404 for a non-existent product ID', async ({ request }) => {
            const products = new ProductsApi(request);

            const response = await test.step('Send GET /products/non-existent-id', () =>
                products.getById('non-existent-id')
            );

            await test.step('Assert status 404', () => {
                expect(response.status()).toBe(HttpStatus.NOT_FOUND);
            });
        });
    });

    test.describe('GET /products/search', () => {
        test('returns products matching the search query', async ({ request }) => {
            const products = new ProductsApi(request);

            const response = await test.step('Send GET /products/search?q=hammer', () =>
                products.search('hammer')
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert response contains data array', async () => {
                const body = await response.json();
                expect(body).toMatchObject({ data: expect.any(Array) });
            });
        });

        test('returns empty results for a query with no matches', async ({ request }) => {
            const products = new ProductsApi(request);

            const response = await test.step('Send GET /products/search?q=zzznomatchzzz', () =>
                products.search('zzznomatchzzz')
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });

            await test.step('Assert data array is empty', async () => {
                const body = await response.json();
                expect(body.data).toHaveLength(0);
            });
        });
    });

    test.describe('GET /products/{productId}/related', () => {
        test('returns related products for a valid product', async ({ request }) => {
            const products = new ProductsApi(request);

            const productId = await test.step('Fetch first product ID', async () => {
                const res = await products.getAll();
                const { data } = await res.json();
                return data[0].id as string;
            });

            const response = await test.step(`Send GET /products/${productId}/related`, () =>
                products.getRelated(productId)
            );

            await test.step('Assert status 200 and response is an array', async () => {
                expect(response.status()).toBe(HttpStatus.OK);
                expect(Array.isArray(await response.json())).toBe(true);
            });
        });
    });

    test.describe('POST /products', () => {
        test('creates a new product and returns 201', async ({ request }) => {
            const products = new ProductsApi(request);
            const categories = new CategoriesApi(request);
            const brands = new BrandsApi(request);

            const { categoryId, brandId } = await test.step('Fetch category and brand IDs', async () => {
                const [catRes, brandRes] = await Promise.all([
                    categories.getAll(),
                    brands.getAll(),
                ]);
                const cats = await catRes.json();
                const brnds = await brandRes.json();
                return { categoryId: cats[0].id as string, brandId: brnds[0].id as string };
            });

            const response = await test.step('Send POST /products', () =>
                products.create({
                    name: `Test Product ${Date.now()}`,
                    description: 'Created by automated test',
                    price: 9.99,
                    category_id: categoryId,
                    brand_id: brandId,
                    is_location_offer: false,
                    is_rental: false,
                })
            );

            await test.step('Assert status 201', () => {
                expect(response.status()).toBe(HttpStatus.CREATED);
            });

            await test.step('Assert response contains new product', async () => {
                expect(await response.json()).toMatchObject({
                    id: expect.any(String),
                    name: expect.stringContaining('Test Product'),
                    price: 9.99,
                });
            });
        });
    });
});

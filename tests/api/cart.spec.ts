import { test, expect } from '@playwright/test';
import { HttpStatus } from '../../support/enums/httpStatus';
import { CartApi } from '../../support/api/cartApi';
import { ProductsApi } from '../../support/api/productsApi';

test.describe('Cart API', () => {
    test.use({ baseURL: process.env.API_BASE_URL! });

    test.describe('POST /carts', () => {
        test('creates a new cart and returns a cart ID', async ({ request }) => {
            const cart = new CartApi(request);

            const response = await test.step('Send POST /carts', () =>
                cart.create()
            );

            await test.step('Assert status 201', () => {
                expect(response.status()).toBe(HttpStatus.CREATED);
            });

            await test.step('Assert response contains a cart ID', async () => {
                expect(await response.json()).toMatchObject({ id: expect.any(String) });
            });
        });
    });

    test.describe('Cart item lifecycle', () => {
        test('adds a product to the cart and retrieves it', async ({ request }) => {
            const cart = new CartApi(request);
            const products = new ProductsApi(request);

            const cartId = await test.step('Create a new cart', async () => {
                const res = await cart.create();
                const body = await res.json();
                return body.id as string;
            });

            const productId = await test.step('Fetch first product ID', async () => {
                const res = await products.getAll();
                const { data } = await res.json();
                return data[0].id as string;
            });

            await test.step(`Add product to cart ${cartId}`, async () => {
                const res = await cart.addItem(cartId, { product_id: productId, quantity: 2 });
                expect(res.status()).toBe(HttpStatus.OK);
            });

            await test.step(`Retrieve cart ${cartId} and assert it contains the product`, async () => {
                const res = await cart.get(cartId);
                expect(res.status()).toBe(HttpStatus.OK);
                expect(await res.json()).toMatchObject({ id: cartId });
            });
        });

        test('updates item quantity in the cart', async ({ request }) => {
            const cart = new CartApi(request);
            const products = new ProductsApi(request);

            const { cartId, productId } = await test.step('Create cart and add product', async () => {
                const cartRes = await cart.create();
                const { id } = await cartRes.json();

                const productsRes = await products.getAll();
                const { data } = await productsRes.json();
                const pid = data[0].id as string;

                await cart.addItem(id, { product_id: pid, quantity: 1 });
                return { cartId: id as string, productId: pid };
            });

            const response = await test.step(`Send PUT /carts/${cartId}/product/quantity`, () =>
                cart.updateQuantity(cartId, { product_id: productId, quantity: 3 })
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });
        });

        test('removes a product from the cart', async ({ request }) => {
            const cart = new CartApi(request);
            const products = new ProductsApi(request);

            const { cartId, productId } = await test.step('Create cart and add product', async () => {
                const cartRes = await cart.create();
                const { id } = await cartRes.json();

                const productsRes = await products.getAll();
                const { data } = await productsRes.json();
                const pid = data[0].id as string;

                await cart.addItem(id, { product_id: pid, quantity: 1 });
                return { cartId: id as string, productId: pid };
            });

            const response = await test.step(`Send DELETE /carts/${cartId}/product/${productId}`, () =>
                cart.removeProduct(cartId, productId)
            );

            await test.step('Assert status 200', () => {
                expect(response.status()).toBe(HttpStatus.OK);
            });
        });
    });

    test.describe('DELETE /carts/{cartId}', () => {
        test('deletes an entire cart', async ({ request }) => {
            const cart = new CartApi(request);

            const cartId = await test.step('Create a new cart', async () => {
                const res = await cart.create();
                const body = await res.json();
                return body.id as string;
            });

            const response = await test.step(`Send DELETE /carts/${cartId}`, () =>
                cart.delete(cartId)
            );

            await test.step('Assert status 204', () => {
                expect(response.status()).toBe(HttpStatus.NO_CONTENT);
            });
        });
    });

    test.describe('GET /carts/{cartId}', () => {
        test('returns 404 for a non-existent cart', async ({ request }) => {
            const cart = new CartApi(request);

            const response = await test.step('Send GET /carts/non-existent-cart-id', () =>
                cart.get('non-existent-cart-id')
            );

            await test.step('Assert status 404', () => {
                expect(response.status()).toBe(HttpStatus.NOT_FOUND);
            });
        });
    });
});

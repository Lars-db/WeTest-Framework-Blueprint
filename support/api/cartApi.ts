import { APIRequestContext, APIResponse } from '@playwright/test';

export class CartApi {
    constructor(private readonly request: APIRequestContext) {}

    create(): Promise<APIResponse> {
        return this.request.post('/carts');
    }

    get(cartId: string): Promise<APIResponse> {
        return this.request.get(`/carts/${cartId}`);
    }

    addItem(cartId: string, data: { product_id: string; quantity: number }): Promise<APIResponse> {
        return this.request.post(`/carts/${cartId}`, { data });
    }

    updateQuantity(cartId: string, data: { product_id: string; quantity: number }): Promise<APIResponse> {
        return this.request.put(`/carts/${cartId}/product/quantity`, { data });
    }

    removeProduct(cartId: string, productId: string): Promise<APIResponse> {
        return this.request.delete(`/carts/${cartId}/product/${productId}`);
    }

    delete(cartId: string): Promise<APIResponse> {
        return this.request.delete(`/carts/${cartId}`);
    }
}

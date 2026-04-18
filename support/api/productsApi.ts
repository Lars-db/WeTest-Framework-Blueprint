import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductsApi {
    constructor(private readonly request: APIRequestContext) {}

    getAll(params?: Record<string, string>): Promise<APIResponse> {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request.get(`/products${query}`);
    }

    getById(productId: string): Promise<APIResponse> {
        return this.request.get(`/products/${productId}`);
    }

    getRelated(productId: string): Promise<APIResponse> {
        return this.request.get(`/products/${productId}/related`);
    }

    search(query: string): Promise<APIResponse> {
        return this.request.get(`/products/search?q=${query}`);
    }

    create(data: {
        name: string;
        description: string;
        price: number;
        category_id: string;
        brand_id: string;
        is_location_offer: boolean;
        is_rental: boolean;
    }): Promise<APIResponse> {
        return this.request.post('/products', { data });
    }
}

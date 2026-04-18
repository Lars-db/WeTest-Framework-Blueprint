import { APIRequestContext, APIResponse } from '@playwright/test';

export class BrandsApi {
    constructor(private readonly request: APIRequestContext) {}

    getAll(): Promise<APIResponse> {
        return this.request.get('/brands');
    }

    getById(brandId: string): Promise<APIResponse> {
        return this.request.get(`/brands/${brandId}`);
    }

    search(query: string): Promise<APIResponse> {
        return this.request.get(`/brands/search?q=${query}`);
    }

    create(data: { name: string; slug: string }): Promise<APIResponse> {
        return this.request.post('/brands', { data });
    }

    update(brandId: string, data: { name: string; slug: string }): Promise<APIResponse> {
        return this.request.put(`/brands/${brandId}`, { data });
    }

    delete(brandId: string, token: string): Promise<APIResponse> {
        return this.request.delete(`/brands/${brandId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    deleteUnauthorized(brandId: string): Promise<APIResponse> {
        return this.request.delete(`/brands/${brandId}`);
    }
}

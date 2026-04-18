import { APIRequestContext, APIResponse } from '@playwright/test';

export class CategoriesApi {
    constructor(private readonly request: APIRequestContext) {}

    getAll(): Promise<APIResponse> {
        return this.request.get('/categories');
    }

    getTree(): Promise<APIResponse> {
        return this.request.get('/categories/tree');
    }

    getTreeById(categoryId: string): Promise<APIResponse> {
        return this.request.get(`/categories/tree/${categoryId}`);
    }

    search(query: string): Promise<APIResponse> {
        return this.request.get(`/categories/search?q=${query}`);
    }

    create(data: { name: string; slug: string }): Promise<APIResponse> {
        return this.request.post('/categories', { data });
    }

    createWithEmptyBody(): Promise<APIResponse> {
        return this.request.post('/categories', { data: {} });
    }

    update(categoryId: string, data: { name: string; slug: string }): Promise<APIResponse> {
        return this.request.put(`/categories/${categoryId}`, { data });
    }
}

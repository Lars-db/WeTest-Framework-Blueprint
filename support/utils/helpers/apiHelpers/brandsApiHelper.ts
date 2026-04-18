import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResult } from './apiTypes';
import { BrandResponse as Brand } from '../../../.zod/schemas/brandResponse';

async function resolve<T>(call: Promise<APIResponse>): Promise<ApiResult<T>> {
    const res = await call;
    return { status: res.status(), body: await res.json().catch(() => null) };
}

export abstract class BrandsApiHelper {
    static getAll(request: APIRequestContext): Promise<ApiResult<Brand[]>> {
        return resolve(request.get('/brands'));
    }

    static getById(request: APIRequestContext, brandId: string): Promise<ApiResult<Brand>> {
        return resolve(request.get(`/brands/${brandId}`));
    }

    static search(request: APIRequestContext, query: string): Promise<ApiResult<Brand[]>> {
        return resolve(request.get(`/brands/search?q=${query}`));
    }

    static create(request: APIRequestContext, data: { name: string; slug: string }): Promise<ApiResult<Brand>> {
        return resolve(request.post('/brands', { data }));
    }

    static update(request: APIRequestContext, brandId: string, data: { name: string; slug: string }): Promise<ApiResult<Brand>> {
        return resolve(request.put(`/brands/${brandId}`, { data }));
    }

    static delete(request: APIRequestContext, brandId: string, token: string): Promise<ApiResult<null>> {
        return resolve(request.delete(`/brands/${brandId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
    }

    static deleteUnauthorized(request: APIRequestContext, brandId: string): Promise<ApiResult<null>> {
        return resolve(request.delete(`/brands/${brandId}`));
    }
}

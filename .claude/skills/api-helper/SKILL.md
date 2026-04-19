---
name: api-helper
description: Scaffold a typed API helper class for a new resource in this Playwright/TypeScript project. Use when the user says "create an API helper for X", "add a helper for the Y endpoint", or wants to add a new resource to the API test layer.
---

# API Helper Scaffolder

Generates a new `{Resource}ApiHelper` class in `support/utils/helpers/apiHelpers/` following the established pattern in `brandsApiHelper.ts`.

## Pattern

Every helper:
- Is an `abstract class` with `static` methods (never instantiated)
- Uses a shared `resolve<T>()` function that wraps `APIResponse` into `ApiResult<T>`
- Reads the base URL and endpoint path from `process.env` — **never hardcodes URLs**
- Types return bodies against the Zod-generated schemas in `support/.zod/schemas/`
- Imports `ApiResult` from `./apiTypes`

## `ApiResult<T>` shape (from `support/utils/helpers/apiHelpers/apiTypes.ts`)

```ts
export interface ApiResult<T> {
  status: number;
  body: T;
}
```

## Reference implementation (`brandsApiHelper.ts`)

```ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResult } from './apiTypes';
import { BrandResponse as Brand } from '../../../.zod/schemas/brandResponse';

async function resolve<T>(call: Promise<APIResponse>): Promise<ApiResult<T>> {
    const res = await call;
    return { status: res.status(), body: await res.json().catch(() => null) };
}

export abstract class BrandsApiHelper {
    static getAll(request: APIRequestContext): Promise<ApiResult<Brand[]>> {
        return resolve(request.get(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT));
    }

    static getById(request: APIRequestContext, brandId: string): Promise<ApiResult<Brand>> {
        return resolve(request.get(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT + `/${brandId}`));
    }

    static search(request: APIRequestContext, query: string): Promise<ApiResult<Brand[]>> {
        return resolve(request.get(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT + `/search?q=${query}`));
    }

    static create(request: APIRequestContext, data: { name: string; slug: string }): Promise<ApiResult<Brand>> {
        return resolve(request.post(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT, { data }));
    }

    static update(request: APIRequestContext, brandId: string, data: { name: string; slug: string }): Promise<ApiResult<Brand>> {
        return resolve(request.put(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT + `/${brandId}`, { data }));
    }

    static delete(request: APIRequestContext, brandId: string, token: string): Promise<ApiResult<null>> {
        return resolve(request.delete(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT + `/${brandId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
    }
}
```

## Steps to generate a new helper

1. **Identify the resource** from the user's request (e.g. "products" → `ProductsApiHelper`)
2. **Read the swagger file** at `sprint5/API/storage/api-docs/api-docs.json` to find all endpoints for that resource and their HTTP methods, path params, request body shapes, and auth requirements
3. **Find the matching Zod schemas** in `support/.zod/schemas/` — look for files named after the response type (e.g. `productResponse.ts`, `cartResponse.ts`)
4. **Check if the endpoint env var exists** in `support/environment/.env.tst` (e.g. `PRODUCTS_ENDPOINT=/products`). If it is missing, tell the user to run `/endpoint` first or add it now
5. **Create the file** at `support/utils/helpers/apiHelpers/{resource}ApiHelper.ts`
6. **Run `npx tsc --noEmit`** to confirm no type errors

## Naming conventions

| Resource | Class name | Env var | File |
|---|---|---|---|
| brands | `BrandsApiHelper` | `BRANDS_ENDPOINT` | `brandsApiHelper.ts` |
| products | `ProductsApiHelper` | `PRODUCTS_ENDPOINT` | `productsApiHelper.ts` |
| categories | `CategoriesApiHelper` | `CATEGORIES_ENDPOINT` | `categoriesApiHelper.ts` |
| users | `UsersApiHelper` | `USERS_ENDPOINT` | `usersApiHelper.ts` |
| cart | `CartApiHelper` | `CART_ENDPOINT` | `cartApiHelper.ts` |

## Auth-protected endpoints

Endpoints that require a bearer token should accept a `token: string` parameter and set the `Authorization` header:

```ts
headers: { Authorization: `Bearer ${token}` }
```

Endpoints without auth do not accept a token parameter.

---
name: api-test
description: Generate a Playwright API test spec for a resource in this project. Use when the user says "write API tests for X", "add tests for the Y endpoint", or wants to test a new resource. Requires the matching ApiHelper to exist first.
---

# API Test Generator

Generates `tests/api/{resource}.spec.ts` following the pattern established in `tests/api/brands.spec.ts`.

## Pattern

Every spec file:
- Has **one `test.describe` per endpoint** (`GET /brands`, `POST /brands`, etc.)
- Each test has exactly **two `test.step` blocks**:
  1. **Fetch/Act step** — calls the static helper method, asserts `result.status`, returns the result
  2. **Validate step** — runs `safeParse` against the Zod schema and asserts `validationResult.success`
- Imports the helper from `../../support/utils/helpers/apiHelpers/{resource}ApiHelper`
- Imports Zod validators from `../../support/.zod/{resource}`
- Does **not** use `test.use({ baseURL })` — the helper handles the full URL via `process.env`
- Does **not** assert individual fields in the body — Zod schema validation covers that

## Reference implementation (`brands.spec.ts`)

```ts
import { expect, test } from "@playwright/test";
import { HttpStatus } from "../../support/enums/httpStatus";
import { BrandsApiHelper } from "../../support/utils/helpers/apiHelpers/brandsApiHelper";
import { getBrandsResponse } from "../../support/.zod/brand";

test.describe("Brands API", () => {
    test("returns an array of brands", async ({ request }) => {
        const { body: brandsResponse } = await test.step("Fetch all brands", async () => {
            const result = await BrandsApiHelper.getAll(request);
            expect(result.status).toBe(HttpStatus.OK);
            return result;
        });

        await test.step("Validate brands response", async () => {
            const validationResult = getBrandsResponse.safeParse(brandsResponse);
            expect(validationResult.success, validationResult.error?.message).toBe(true);
        });
    });
});
```

## `HttpStatus` enum (from `support/enums/httpStatus.ts`)

```ts
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    ...
}
```

## Steps to generate a new spec

1. **Verify the helper exists** at `support/utils/helpers/apiHelpers/{resource}ApiHelper.ts`. If not, run `/api-helper` first
2. **Read the swagger file** at `sprint5/API/storage/api-docs/api-docs.json` to get all endpoints, response codes, and auth requirements for this resource
3. **Check what Zod validators exist** in `support/.zod/{resource}.ts` — use the named exports that match each operation (e.g. `getBrandsResponse`, `getBrandResponse`, `storeBrandBody`)
4. **Generate one `test` per operation** — happy path for each method + error cases (404, 401, 422) where relevant
5. **Create the file** at `tests/api/{resource}.spec.ts`
6. **Run `npx tsc --noEmit`** to verify

## Test naming convention

Step names should read as plain English actions:
- Act step: `"Fetch all {resources}"`, `"Create a {resource}"`, `"Delete {resource} {id}"`
- Validate step: `"Validate {resource} response"`, `"Validate {resource} list"`

## Error case pattern

For error cases (401, 404, 422), the validate step should assert the error response shape if a Zod schema exists for it, otherwise just assert the status in the act step and skip the validate step:

```ts
test("returns 401 for unauthenticated delete", async ({ request }) => {
    await test.step("Delete brand without token", async () => {
        const result = await BrandsApiHelper.deleteUnauthorized(request, "some-id");
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
    });
});
```

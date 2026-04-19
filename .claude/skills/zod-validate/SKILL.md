---
name: zod-validate
description: Add Zod schema validation steps to existing Playwright API tests in this project. Use when the user says "add schema validation to X tests", "validate the response shape in Y spec", or "add Zod validation". Works on any spec under tests/api/.
---

# Zod Validation Step Adder

Adds a `"Validate … response"` `test.step` block to API tests that assert status codes but do not yet validate the response body shape with Zod.

## What this does

Scans an API spec file for tests that have an act step (checking `result.status`) but no `safeParse` validate step, then adds the matching Zod validator from `support/.zod/`.

## Target pattern (after transformation)

```ts
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
```

## Zod schema locations

All auto-generated Zod schemas live in two places:

- `support/.zod/{resource}.ts` — top-level named exports grouped by operation (e.g. `getBrandsResponse`, `storeBrandBody`)
- `support/.zod/schemas/` — individual schema files (e.g. `brandResponse.ts`, `productResponse.ts`)

Prefer importing from `support/.zod/{resource}.ts` (the grouped file) when a matching export exists there, as it matches the pattern in `brands.spec.ts`.

## Steps

1. **Read the target spec file** to identify which tests are missing a validate step
2. **Identify the response type** for each test from the helper method's return type (e.g. `ApiResult<Brand[]>`)
3. **Find the matching Zod export** in `support/.zod/{resource}.ts` — look for names like `get{Resource}Response`, `get{Resource}sResponse`, `store{Resource}Response`
4. **Add the import** for the Zod validator at the top of the spec file if not already present
5. **Transform each act step** to destructure `body` from the result: `const { body: xyzResponse } = await test.step(...)`
6. **Add the validate step** immediately after the act step
7. **Run `npx tsc --noEmit`** to verify no type errors

## Error case tests — skip validation

Tests that assert a non-2xx status (401, 404, 422) do **not** get a validate step added. The body of error responses is not guaranteed to match the success schema. Only add Zod validation to happy-path tests.

## safeParse assertion pattern

Always pass the error message as the second argument to `expect` so failures show the Zod error in the test report:

```ts
const validationResult = getBrandsResponse.safeParse(brandsResponse);
expect(validationResult.success, validationResult.error?.message).toBe(true);
```

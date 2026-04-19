# WeTest Framework Blueprint — Project Instructions

> Canonical reference for contributors and AI coding agents. Covers architecture decisions, patterns, conventions, and step-by-step workflows. When in doubt, read this first.

---

## Table of contents

1. [Project context](#1-project-context)
2. [Local setup](#2-local-setup)
3. [Project structure](#3-project-structure)
4. [Environment & configuration](#4-environment--configuration)
5. [API testing layer](#5-api-testing-layer)
6. [UI testing layer](#6-ui-testing-layer)
7. [Code conventions](#7-code-conventions)
8. [Step-by-step workflows](#8-step-by-step-workflows)
9. [What not to do](#9-what-not-to-do)
10. [Commands reference](#10-commands-reference)

---

## 1. Project context

This is a **Playwright + TypeScript** test automation framework for the Toolshop application — a practice e-commerce platform available at `practicesoftwaretesting.com`. The framework is used as a conference blueprint (WeTest 2026) demonstrating enterprise-grade patterns.

**Two test layers, two disciplines:**
- **UI tests** — end-to-end browser tests using the Page Object Model
- **API tests** — contract + integration tests using typed helpers and Zod schema validation

The application under test is a Laravel REST API backed by an Angular frontend. Both can be run locally via Docker or tested against the hosted remote environment.

**Application URLs**

| Layer | Local (tst) | Remote (acc) |
|---|---|---|
| Frontend | `http://localhost:4200` | `https://practicesoftwaretesting.com` |
| API | `http://localhost:8091` | `https://api.practicesoftwaretesting.com` |
| Swagger UI | `http://localhost:8091/api/documentation` | `https://api.practicesoftwaretesting.com/api/documentation` |
| MailCatcher | `http://localhost:1080` | — |
| PHPMyAdmin | `http://localhost:8000` (root/root) | — |

**Default test accounts**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@practicesoftwaretesting.com` | `welcome01` |
| Customer | `customer@practicesoftwaretesting.com` | `welcome01` |
| Customer 2 | `customer2@practicesoftwaretesting.com` | `welcome01` |

---

## 2. Local setup

```bash
# 1. Install Node dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Start the Docker environment (takes ~5 min on first run)
docker compose up -d

# 4. Seed the database
docker compose exec laravel-api php artisan migrate:fresh --seed

# 5. Verify the app is up at http://localhost:4200, then run tests
npm test
```

**Switching sprints:** Update `SPRINT` in the root `.env` file (e.g. `SPRINT=sprint5`).

**Reset database at any time:**
```bash
docker compose exec laravel-api php artisan migrate:fresh --seed
```

---

## 3. Project structure

```
tests/
  ui/                     # Browser end-to-end specs, organized by topic
  api/                    # API integration specs, one file per resource

support/
  pages/                  # Page Object Model classes (one per application page)
  utils/
    fixtures/
      testFixture.ts      # THE entry point for all test imports — extends Playwright base test
    helpers/
      apiHelpers/         # API helper classes (one per API resource)
        apiTypes.ts       # Shared ApiResult<T> interface
        brandsApiHelper.ts
      actionHelper.ts     # DOM interaction utilities
      assertionHelper.ts  # Custom assertion utilities
      dateHelper.ts       # Date/time helpers
      dbHelper.ts         # Database access helpers
      fileHelper.ts       # File I/O helpers
      jsonHelper.ts       # JSON utilities
      testDataHelper.ts   # Test data generation
    logger.ts             # Winston logger factory
  enums/
    httpStatus.ts         # HTTP status codes as enum
    durations.ts          # Time constants in milliseconds
    regexPatterns.ts      # Reusable regex patterns
  config/
    pollingConfig.ts      # Named retry/polling presets
  environment/
    .env.global           # Values shared across all environments (loaded first)
    .env.tst              # Local environment overrides (default)
    .env.acc              # Acceptance/remote environment overrides
  .zod/                   # Auto-generated Zod schemas — NEVER edit manually
    {resource}.ts         # Grouped exports per resource (use these in tests)
    schemas/              # Individual schema files (use these in helpers for types)

.claude/
  skills/                 # Claude Code skill definitions

sprint5/API/
  storage/api-docs/api-docs.json  # Swagger spec — source of truth for the API

playwright.config.ts      # Playwright configuration
orval.config.ts           # Orval config for Zod code generation from swagger
tsconfig.json
```

**Key principle:** Everything a test needs comes from `support/`. Tests never duplicate infrastructure logic — they call helpers, use fixtures, import enums.

---

## 4. Environment & configuration

### How environment loading works

`support/globalSetup.ts` runs before any test. It:
1. Loads `support/environment/.env.global`
2. Loads `support/environment/.env.${ENV}` (defaults to `tst`)
3. Starts Docker if needed, waits for services, seeds the database

Select environment with the `ENV` variable:
```bash
ENV=acc npm test     # runs against https://api.practicesoftwaretesting.com
npm test             # runs against http://localhost:8091 (default: tst)
```

### Variable conventions

| Variable pattern | Purpose | Example |
|---|---|---|
| `BASE_URL` | Frontend URL for UI tests | `http://localhost:4200` |
| `API_BASE_URL` | API base URL for API helpers | `http://localhost:8091` |
| `{RESOURCE}_ENDPOINT` | Path for a specific resource | `BRANDS_ENDPOINT=/brands` |

**Rule:** API helpers construct URLs as `process.env.API_BASE_URL! + process.env.{RESOURCE}_ENDPOINT`. Never hardcode a URL or path anywhere else.

**Rule:** When adding a new API helper, register its `{RESOURCE}_ENDPOINT` in **both** `.env.tst` and `.env.acc` before writing the helper.

### Playwright config highlights (`playwright.config.ts`)

- `testDir`: `./tests`
- `baseURL`: `process.env.BASE_URL || 'http://localhost:4200'` — used by UI tests only
- `testIdAttribute`: `data-test` — used by `page.getByTestId()`
- `fullyParallel`: true locally, `workers: 1` on CI
- `retries`: 1 locally, 2 on CI
- `globalSetup` / `globalTeardown`: wired to `support/`

---

## 5. API testing layer

### Design decisions

- **Static helpers over instantiated clients** — `BrandsApiHelper.getAll(request)` reads better in test steps than `new BrandsApi(request).getAll()`
- **`ApiResult<T>` over raw `APIResponse`** — tests work with already-parsed `{ status, body }` so they don't need to call `.json()` or `.status()` directly
- **Zod validation as a separate step** — schema validation is distinct from status assertion. Both failures are immediately visible in the HTML report as separate named steps
- **No `test.use({ baseURL })`** — helpers manage their own full URLs, so API specs are environment-agnostic

### `ApiResult<T>` shape

```ts
// support/utils/helpers/apiHelpers/apiTypes.ts
export interface ApiResult<T> {
  status: number;
  body: T;
}
```

### Helper anatomy

Every API helper follows this exact structure:

```ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResult } from './apiTypes';
import { BrandResponse as Brand } from '../../../.zod/schemas/brandResponse';

// Private resolver — shared within the file, never exported
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

    // Auth-protected endpoints accept a token parameter
    static delete(request: APIRequestContext, brandId: string, token: string): Promise<ApiResult<null>> {
        return resolve(request.delete(process.env.API_BASE_URL! + process.env.BRANDS_ENDPOINT + `/${brandId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
    }
}
```

**Rules:**
- Class is `abstract` — it cannot and should not be instantiated
- All methods are `static` — called as `BrandsApiHelper.getAll(request)`
- One method per endpoint operation
- Return type body comes from `support/.zod/schemas/` (individual schema files)
- Auth-required endpoints: add `token: string` param, set `Authorization: Bearer ${token}` header
- No-auth endpoints: no token param

### Spec anatomy

Every API spec follows this exact structure:

```ts
import { expect, test } from "@playwright/test";
import { HttpStatus } from "../../support/enums/httpStatus";
import { BrandsApiHelper } from "../../support/utils/helpers/apiHelpers/brandsApiHelper";
import { getBrandsResponse } from "../../support/.zod/brand";

test.describe("Brands API", () => {
    // No test.use({ baseURL }) here — helpers handle the full URL

    test("returns an array of brands", async ({ request }) => {
        // Step 1: act + status assertion — destructure body for use in step 2
        const { body: brandsResponse } = await test.step("Fetch all brands", async () => {
            const result = await BrandsApiHelper.getAll(request);
            expect(result.status).toBe(HttpStatus.OK);
            return result;
        });

        // Step 2: schema validation — use safeParse, pass error as assertion message
        await test.step("Validate brands response", async () => {
            const validationResult = getBrandsResponse.safeParse(brandsResponse);
            expect(validationResult.success, validationResult.error?.message).toBe(true);
        });
    });
});
```

**Rules:**
- Import `test` from `@playwright/test` directly (not from `testFixture`) — API tests don't need UI fixtures
- Two `test.step` blocks per happy-path test: act step + validate step
- Error case tests (4xx responses) only need the act step — skip Zod validation
- Import Zod validators from `support/.zod/{resource}.ts` (grouped file), not from `support/.zod/schemas/`
- The `expect(..., validationResult.error?.message)` pattern makes Zod errors readable in the report

### Zod schema sources

| Use case | Import from |
|---|---|
| Test validation | `support/.zod/{resource}.ts` — named exports like `getBrandsResponse` |
| Helper return types | `support/.zod/schemas/{schema}.ts` — individual type exports |

Schemas are auto-generated by orval from the swagger file. **Never edit them by hand.**

To regenerate after an API change:
```bash
npm run generate:api
```

---

## 6. UI testing layer

### Always import `test` from the fixture

```ts
// Correct
import { test } from '../../support/utils/fixtures/testFixture';

// Wrong — misses injected fixtures
import { test } from '@playwright/test';
```

The fixture injects: `page`, `assertionHelper`, `sharedComponents`, `homePage`, `loginPage`, `chatPage`, `logger`.

### Page Object Model

One class per application page. Lives in `support/pages/`. Named `{PageName}Page`.

```ts
import { type Locator, Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

export class CheckoutPage {
    readonly page: Page;
    readonly placeOrderButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page, language = process.env.LANGUAGE || 'en') {
        this.page = page;
        const t = getTranslations(language).checkoutPage;

        this.placeOrderButton = page.getByRole('button', { name: t.placeOrder });
        this.confirmationMessage = page.getByRole('alert').filter({ hasText: t.confirmation });
    }

    async goto() {
        await this.page.goto('/checkout');
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}
```

**Locator priority (most to least preferred):**

| Priority | Method | When to use |
|---|---|---|
| 1 | `page.getByRole(...)` | Interactive elements with ARIA roles |
| 2 | `page.getByTestId(...)` | Elements with `data-test` attribute |
| 3 | `page.getByLabel(...)` | Form fields associated with a label |
| 4 | `page.getByText(...)` | Read-only text content |
| 5 | `page.locator('css')` | Last resort only |

**Never put assertions inside a page object.** Page objects model actions and state, not expectations. Assertions belong in the test body.

### Wiring a new POM into the fixture

After creating the class, add it to `support/utils/fixtures/testFixture.ts`:

```ts
// 1. Import the class
import { CheckoutPage } from '../../pages/checkoutPage';

// 2. Add to CombinedFixtures type
export type CombinedFixtures = {
    // existing...
    checkoutPage: CheckoutPage;
};

// 3. Add to baseTest.extend
const test = baseTest.extend<CombinedFixtures>({
    // existing...
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});
```

### Polling and waits

Never use `page.waitForTimeout()`. Use Playwright's built-in waiting or the project's polling presets:

```ts
import { POLLING_CONFIG } from '../../support/config/pollingConfig';

// For polling assertions:
await expect(element).toBeVisible(POLLING_CONFIG.NORMAL);
```

| Preset | Timeout | Interval | Use for |
|---|---|---|---|
| `FAST` | 10s | 1s | Quick UI interactions |
| `NORMAL` | 30s | 1s | Standard page loads |
| `GRADUAL` | 30s | escalating | Async operations |
| `PATIENT` | 60s+ | varies | Slow background jobs |

---

## 7. Code conventions

### TypeScript

- Strict mode is enabled — no implicit `any`, no non-null assertion without good reason (the env var `!` in helpers is an accepted exception)
- Run `npx tsc --noEmit` after every change — never leave type errors
- Use types from `support/.zod/schemas/` for API response shapes rather than defining your own

### Enums over magic values

```ts
// Always
import { HttpStatus } from '../../support/enums/httpStatus';
import { Durations } from '../../support/enums/durations';

expect(result.status).toBe(HttpStatus.OK);         // not 200
await page.waitForTimeout(Durations.FIVE_SECONDS);  // not 5000
```

### Logging

Logger is injected via the fixture. Use appropriate levels:

```ts
test('example', async ({ page, logger }) => {
    logger.info('Navigating to checkout');
    await page.goto('/checkout');
    logger.debug('Cart contents:', cartItems);
});
```

Logs are written to `test-results/logs/combined.log` and `error.log`.

### Test naming

Describe blocks name the endpoint or feature. Test titles describe the scenario in plain English starting with a verb:

```ts
test.describe('POST /users/login', () => {
    test('returns a bearer token for valid credentials', ...);
    test('returns 401 for an incorrect password', ...);
    test('returns 422 when the password field is missing', ...);
});
```

---

## 8. Step-by-step workflows

### Adding tests for a new API resource

1. **Register the endpoint env var**
   ```
   # Add to support/environment/.env.tst AND .env.acc
   PRODUCTS_ENDPOINT=/products
   ```

2. **Create the helper** at `support/utils/helpers/apiHelpers/productsApiHelper.ts`
   - Copy the structure from `brandsApiHelper.ts`
   - One static method per swagger operation
   - Import response types from `support/.zod/schemas/`

3. **Create the spec** at `tests/api/products.spec.ts`
   - One `test.describe` per endpoint group
   - Two `test.step` blocks per happy-path test
   - Import Zod validators from `support/.zod/product.ts`

4. **Type-check**: `npx tsc --noEmit`

### Adding a new UI page

1. **Create the POM** at `support/pages/{name}Page.ts`
   - Use `getByRole` / `getByTestId` locators
   - Constructor only, action methods only, no assertions

2. **Wire into fixture** in `support/utils/fixtures/testFixture.ts`
   - Add to `CombinedFixtures` type
   - Add to `baseTest.extend`

3. **Write the spec** at `tests/ui/{feature}/{name}.spec.ts`
   - Import from `testFixture`, not `@playwright/test`
   - Use the POM via the injected fixture param

4. **Type-check**: `npx tsc --noEmit`

### Regenerating Zod schemas after an API change

```bash
# Make sure the swagger file is up to date at:
# sprint5/API/storage/api-docs/api-docs.json

npm run generate:api   # runs orval → overwrites support/.zod/

npx tsc --noEmit       # verify generated code is valid
```

---

## 9. What not to do

| Do not | Do instead |
|---|---|
| Hardcode `'http://localhost:8091'` | Use `process.env.API_BASE_URL!` |
| Hardcode `'/brands'` | Use `process.env.BRANDS_ENDPOINT` |
| `new BrandsApiHelper()` | `BrandsApiHelper.getAll(request)` |
| `expect(res.status()).toBe(200)` | `expect(result.status).toBe(HttpStatus.OK)` |
| `page.waitForTimeout(5000)` | `POLLING_CONFIG.FAST` or Playwright auto-waiting |
| Assertions inside a page object method | Return data from the method, assert in the test |
| `import { test } from '@playwright/test'` in UI specs | `import { test } from '../../support/utils/fixtures/testFixture'` |
| `test.use({ baseURL })` in API specs | Let the helper construct the full URL |
| Edit files in `support/.zod/` | Run `npm run generate:api` |
| Inline regex patterns | Add to `support/enums/regexPatterns.ts` |

---

## 10. Commands reference

```bash
# Testing
npm test                                              # all tests
npx playwright test tests/ui                          # UI only
npx playwright test tests/api                         # API only
npx playwright test -g "login"                        # filter by name
ENV=acc npm test                                      # against acceptance env
npx playwright test --headed                          # see the browser
npx playwright test --debug                           # open Inspector
npx playwright show-report                            # open HTML report

# Development
npx tsc --noEmit                                      # type-check
npm run lint                                          # ESLint
npm run generate:api                                  # regenerate Zod schemas

# Docker
docker compose up -d                                  # start all services
docker compose down                                   # stop all services
docker compose exec laravel-api php artisan migrate:fresh --seed  # reset DB
docker compose exec laravel-api php artisan migrate   # run migrations only
docker compose exec laravel-api php artisan db:seed   # seed only
docker compose exec laravel-api php artisan l5-swagger:generate   # update swagger
docker-compose exec laravel-api tail -f storage/logs/laravel.log  # API logs
```

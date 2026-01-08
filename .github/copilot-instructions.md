# WeTest Framework Blueprint - AI Coding Agent Instructions

## Quick Start for AI Agents

This is a **Playwright + TypeScript test automation framework** designed as an enterprise-grade blueprint for scalable test projects. The codebase is modular and type-safe, with clear separation between test specifications, page objects, and utilities.

## Architecture Overview

### Core Structure
- **`tests/`**: Test specifications organized by type (UI, API) - each test imports custom fixtures and helpers
- **`support/`**: Reusable test infrastructure
  - **`pages/`**: Page Object Model definitions (e.g., `sharedComponents.ts`)
  - **`utils/helpers/`**: Function-based utilities (`actionHelper`, `assertionHelper`, `dateHelper`, `dbHelper`, `fileHelper`, `jsonHelper`, `testDataHelper`)
  - **`config/`**: Configuration objects (e.g., `pollingConfig` for retry strategies)
  - **`enums/`**: Strongly-typed constants (`Durations`, `HttpStatus`, regex patterns)
  - **`environment/`**: Environment-specific `.env` files loaded by `globalSetup.ts`
- **`assets/`**: Test data (CSV, Excel) and visual snapshots for regression testing
- **`CI/`**: CI/CD pipeline configurations

### Key Design Pattern: Fixtures + Helpers
Tests use **custom Playwright fixtures** defined in `support/utils/fixtures/testFixture.ts`:
```typescript
const test = baseTest.extend<CombinedFixtures>({
    assertionHelper: async ({}, use) => {
        const assertionHelper = new AssertionHelper();
        await use(assertionHelper);
    },
    sharedComponents: async ({}, use) => {
        const sharedComponents = new SharedComponents();
        await use(sharedComponents);
    },
});
```
Tests access these via test parameters: `test('name', async ({ page, assertionHelper, sharedComponents }) => {...})`

## Critical Developer Workflows

### Running Tests
- **All tests**: `npm test` (alias for `npx playwright test`)
- **Specific directory**: `npx playwright test tests/ui` or `tests/api`
- **Single file**: `npx playwright test tests/ui/example.spec.ts`
- **By pattern**: `npx playwright test -g "login"` (matches test name)
- **Debug mode**: `npx playwright test --debug` (opens Inspector)
- **Headed mode**: `npx playwright test --headed` (see browser)
- **View report**: `npx playwright show-report` (after test run)

### Parallel vs. Sequential Execution
- Default: **Fully parallel** (workers = undefined locally)
- CI environment: **Sequential** (workers = 1, retries = 2)
- Set via `process.env.CI` detection in `playwright.config.ts`

### Environment Management
1. Global setup (`support/globalSetup.ts`) loads `.env.{ENV}` files based on `ENV` variable
2. Example: `ENV=prod npm test` loads `support/environment/.env.prod`
3. Database initialization/cleanup handled in setup/teardown hooks (currently commented out)

## Project-Specific Patterns & Conventions

### 1. Polling Configuration (Support Retries)
Instead of hardcoded `waitFor()`, use **`POLLING_CONFIG`** from `support/config/pollingConfig.ts`:
```typescript
POLLING_CONFIG.FAST        // 10s timeout, 1s intervals
POLLING_CONFIG.NORMAL      // 30s timeout, 1s intervals  
POLLING_CONFIG.GRADUAL     // 30s timeout, escalating intervals (1s → 2s → 5s)
POLLING_CONFIG.PATIENT     // 1+ minute timeout for slow operations
```
This allows consistent retry strategies across tests and easy tuning.

### 2. Enums for Type-Safe Constants
Never use magic numbers/strings. Use:
- **`Durations`**: `Durations.FIVE_SECONDS`, `Durations.ONE_MINUTE` (prefer over `5000`)
- **`HttpStatus`**: `HttpStatus.OK`, `HttpStatus.NOT_FOUND` (for API assertions)
- **Regex patterns**: Defined in `support/enums/regexPatterns.ts` (avoid inline patterns)

### 3. Helper Organization
Helpers are **stateless utility functions** (not classes with methods):
- **`actionHelper.ts`**: DOM interactions (clicks, fills, scrolls)
- **`assertionHelper.ts`**: Custom assertions (type-safe, reusable)
- **`dateHelper.ts`**: Date/time utilities for test data
- **`dbHelper.ts`**: Database setup/teardown and queries
- **`fileHelper.ts`**: CSV/Excel/file operations
- **`jsonHelper.ts`**: JSON parsing and transformation
- **`testDataHelper.ts`**: Generate/manage test datasets

Import and use: `assertionHelper.isElementVisible(selector)` (via fixture injection)

### 4. Multi-Environment Testing
Framework supports:
- **Desktop browsers**: Chromium, Firefox, WebKit (in `playwright.config.ts`)
- **Mobile browsers**: Pixel 5 (Chrome), iPhone 12 (Safari)
- Tests run across all projects unless filtered by name
- Trace collection on first retry for debugging failures

### 5. TypeScript Configuration
- **Target**: ESNext with strict mode enabled
- **Module resolution**: Bundler (for compatibility)
- **Lib**: ESNext + DOM (for browser APIs)
- All source files included, excluding `node_modules`, `test-results`, `playwright-report`

## External Dependencies & Integration Points

### Key Dependencies
- **`@playwright/test@^1.57.0`**: Core test runner and browser automation
- **`dotenv@^17.2.3`**: Environment variable loading (used in `globalSetup.ts`)
- **`@typescript-eslint/*`**: Linting/type checking
- **`eslint-plugin-playwright`**: Playwright-specific lint rules

### No API Client Library
Currently no dedicated HTTP client - API tests should use **Playwright's built-in `request` context** or add a dedicated client. Database interactions are helper-based, not ORM-dependent.

## When Adding New Test Files

1. **Test location**: `tests/ui/` or `tests/api/` (matches `testDir` in config)
2. **Import fixture**: `import { test } from '../support/utils/fixtures/testFixture';`
3. **Use custom fixtures**: `test('name', async ({ page, assertionHelper, sharedComponents }) => { ... })`
4. **Use enums & polling**:
   ```typescript
   import { Durations } from '../support/enums/durations';
   import { POLLING_CONFIG } from '../support/config/pollingConfig';
   ```
5. **Page objects**: Create in `support/pages/` if reusable across multiple tests; use selectors consistently

## Common Mistakes to Avoid

- ❌ Hardcoded timeouts like `await page.waitForTimeout(5000)` → ✅ Use `Durations.FIVE_SECONDS`
- ❌ Magic HTTP status codes like `expect(response.status()).toBe(200)` → ✅ Use `HttpStatus.OK`
- ❌ Inline regex patterns → ✅ Centralize in `support/enums/regexPatterns.ts`
- ❌ Duplicating poll logic → ✅ Use `POLLING_CONFIG` presets
- ❌ Hardcoding `'http://localhost:3000'` → ✅ Use `baseURL` from config or env var

## Key Files Reference

| File | Purpose |
|------|---------|
| [playwright.config.ts](./playwright.config.ts) | Test runner config, browsers, reporters, base URL |
| [support/utils/fixtures/testFixture.ts](./support/utils/fixtures/testFixture.ts) | Custom fixture definitions (inject helpers into tests) |
| [support/config/pollingConfig.ts](./support/config/pollingConfig.ts) | Polling/retry strategies |
| [support/enums/durations.ts](./support/enums/durations.ts) | Time constants in ms |
| [support/globalSetup.ts](./support/globalSetup.ts) | Pre-test hook: loads env, initializes DB |
| [support/globalTeardown.ts](./support/globalTeardown.ts) | Post-test cleanup: closes connections |

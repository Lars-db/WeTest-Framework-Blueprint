---
name: endpoint
description: Register a new API endpoint path as an environment variable across all env files in this project. Use when the user says "add the X endpoint", "register the Y endpoint env var", or when a new ApiHelper references an endpoint that is not yet in the env files.
---

# Endpoint Environment Variable Registrar

Adds a new `{RESOURCE}_ENDPOINT=/path` entry to every environment file in `support/environment/` so that API helpers can reference it via `process.env`.

## Env files to update

Always update **all three** files:

| File | Purpose |
|---|---|
| `support/environment/.env.tst` | Local / test environment (default) |
| `support/environment/.env.acc` | Acceptance / remote environment |
| `support/environment/.env.global` | Shared values loaded before env-specific files |

The endpoint path itself is the same across environments — only `API_BASE_URL` differs per env.

## Existing entries (reference)

```
# .env.tst
API_BASE_URL=http://localhost:8091
BASE_URL=http://localhost:4200
HEADLESS=true
BRANDS_ENDPOINT=/brands

# .env.acc
API_BASE_URL=https://api.practicesoftwaretesting.com

# .env.global
(shared overrides go here)
```

## Naming convention

| Resource | Env var name | Value |
|---|---|---|
| brands | `BRANDS_ENDPOINT` | `/brands` |
| products | `PRODUCTS_ENDPOINT` | `/products` |
| categories | `CATEGORIES_ENDPOINT` | `/categories` |
| users | `USERS_ENDPOINT` | `/users` |
| cart | `CART_ENDPOINT` | `/carts` |
| messages | `MESSAGES_ENDPOINT` | `/messages` |
| invoices | `INVOICES_ENDPOINT` | `/invoices` |
| favorites | `FAVORITES_ENDPOINT` | `/favorites` |

## Steps

1. **Identify the endpoint path** — read `sprint5/API/storage/api-docs/api-docs.json` and find the base path for the resource (the path without any `{id}` segments, e.g. `/products`)
2. **Derive the env var name** — `{RESOURCE_UPPERCASE}_ENDPOINT`
3. **Check for duplicates** — grep all three env files; if the var already exists, tell the user and stop
4. **Append to `.env.tst`** — add `{VAR}={path}` on a new line
5. **Append to `.env.acc`** — same entry (the path is environment-agnostic)
6. **Add to `.env.global` only if** it truly applies globally (rarely needed for endpoint paths — usually skip this file)
7. **Confirm** by showing the user what was added and to which files

## How API helpers consume the variable

```ts
// In the helper:
process.env.API_BASE_URL! + process.env.PRODUCTS_ENDPOINT

// Results in e.g.:
// tst:  http://localhost:8091/products
// acc:  https://api.practicesoftwaretesting.com/products
```

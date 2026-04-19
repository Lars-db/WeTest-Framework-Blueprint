---
name: pom
description: Generate a Playwright Page Object Model class for a UI page in this project. Use when the user says "create a page object for X", "add a POM for Y", or "add a page class for the Z page". Also wires the new POM into the test fixture.
---

# Page Object Model Generator

Generates a new POM class in `support/pages/` and wires it into `support/utils/fixtures/testFixture.ts`, following the pattern established in `loginPage.ts`.

## Pattern

Every page object:
- Is a `class` exported as a named export
- Takes `Page` (and optionally `language: string`) in the constructor
- Declares all interactable elements as `readonly` `Locator` properties
- Uses **semantic locators** in priority order: `getByRole` > `getByTestId` (attribute: `data-test`) > `getByLabel` > `getByText`
- Groups all locators in the constructor; all actions as separate `async` methods
- Never puts assertions inside the page object — assertions belong in tests

## Reference implementation (`loginPage.ts`)

```ts
import { type Locator, Page } from '@playwright/test';
import { getTranslations } from '../utils/translations';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page, language: string = process.env.LANGUAGE || 'en') {
        this.page = page;
        const t = getTranslations(language).loginPage;

        this.usernameInput = page.getByRole('textbox', { name: t.usernameInput });
        this.passwordInput = page.getByRole('textbox', { name: t.passwordInput });
        this.loginButton = page.getByRole('button', { name: t.loginSubmitButton });
        this.loginError = page.getByRole('alert').filter({ hasText: t.loginError });
    }

    async enterLoginCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

## Fixture wiring (`support/utils/fixtures/testFixture.ts`)

After creating the POM, add it to `CombinedFixtures` and the `baseTest.extend` call:

```ts
// 1. Add to the CombinedFixtures type:
export type CombinedFixtures = {
    // ... existing fixtures ...
    checkoutPage: CheckoutPage;  // ← add
};

// 2. Add to baseTest.extend:
const test = baseTest.extend<CombinedFixtures>({
    // ... existing fixtures ...
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
});
```

## Steps

1. **Identify the page** from the user's request (e.g. "checkout page" → `CheckoutPage`, file `checkoutPage.ts`)
2. **Inspect existing locators** — if the user provides a URL or page description, ask what the key interactions are (or infer from context). Use `data-test` attributes where possible
3. **Create the file** at `support/pages/{name}Page.ts`
4. **Update `testFixture.ts`** — add the type to `CombinedFixtures` and add the fixture initializer
5. **Run `npx tsc --noEmit`** to verify

## Naming conventions

| Page | Class | File |
|---|---|---|
| Login | `LoginPage` | `loginPage.ts` |
| Home | `HomePage` | `homePage.ts` |
| Checkout | `CheckoutPage` | `checkoutPage.ts` |
| Product detail | `ProductDetailPage` | `productDetailPage.ts` |
| Cart | `CartPage` | `cartPage.ts` |

## Locator priority

```
1. page.getByRole(...)           — most resilient, accessible
2. page.getByTestId(...)         — data-test attribute (configured in playwright.config.ts)
3. page.getByLabel(...)          — form fields with labels
4. page.getByText(...)           — visible text (use only for read-only assertions)
5. page.locator('css/xpath')     — last resort only
```

The project's `testIdAttribute` is configured as `data-test` in `playwright.config.ts`.

## Navigation

If the page has a standard URL, add a `goto()` method:

```ts
async goto() {
    await this.page.goto('/checkout');
}
```

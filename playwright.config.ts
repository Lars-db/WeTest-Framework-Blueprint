import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

const ENV = process.env.ENV || 'tst';
const globalEnvPath = 'support/environment/.env.global';
const envPath = `support/environment/.env.${ENV}`;

if (fs.existsSync(globalEnvPath)) dotenv.config({ path: globalEnvPath });
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

export default defineConfig({
    testDir: './tests',
    /*
    ❗️Sets the default timeout in milliseconds for Playwright assertions like:
        await expect(locator).toBeVisible()
        await expect(page).toHaveURL(...)
    */
    expect: {
        timeout: 10_000,
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL || 'http://localhost:4200',
        /* ❗Use 'data-test' for getByTestId locators. Normally data-testid, but this project uses data-test. */
        testIdAttribute: 'data-test',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',
        /* ❗Run tests headlessly by default on CI, but allow to run tests in headed mode with HEADLESS=false env variable */
        headless: process.env.HEADLESS === 'true' || false,
    },

    /* Configure projects for major browsers */
    projects: [
        // ❗Global setup — runs once before all other projects.
        //  Responsibilities: auth cleanup, Docker check, DB seed.
        //  Wired to global-teardown via teardown property.
        {
            name: 'global-setup',
            testDir: './support',
            testMatch: /global\.setup\.ts/,
            teardown: 'global-teardown',
        },

        // ❗Global teardown — runs once after all projects complete.
        //  Responsibilities: auth dir removal, run summary.
        {
            name: 'global-teardown',
            testDir: './support',
            testMatch: /global\.teardown\.ts/,
        },

        // ❗Auth setup — creates .auth/customer.json used by chromium project.
        //  Depends on global-setup so env and DB are ready.
        { name: 'auth-setup', testMatch: /auth\.setup\.ts/, dependencies: ['global-setup'] },

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // ❗Auth state saved by tests/auth.setup.ts — every test in this
                // project starts as a logged-in customer. Tests that need a
                // different role can override with test.use({ storageState }).
                storageState: 'tests/.auth/customer.json',
            },
            dependencies: ['auth-setup'],
        },

        /*    {
              name: 'firefox',
              use: {
                ...devices['Desktop Firefox'],
                  // ❗Auth state saved by tests/auth.setup.ts — every test in this
                  // project starts as a logged-in customer. Tests that need a
                  // different role can override with test.use({ storageState }).
                storageState: 'playwright/.auth/user.json',
              },
              dependencies: ['setup'],
            },
        */
    ],

});

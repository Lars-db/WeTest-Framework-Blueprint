# WeTest Framework Blueprint

A modern, scalable test automation framework built with **Playwright** and **TypeScript**. Designed as a comprehensive blueprint for building enterprise-grade test automation projects.

Presented at **WeTest Conference 2026** | [Visit the Conference](https://wetest.dev)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Framework Components](#framework-components)
  - [Logging with Winston](#logging-with-winston)
  - [Support Utilities](#support-utilities)
- [Design Patterns](#design-patterns)
  - [Builder](#builder)
  - [Factory](#factory)
  - [Strategy](#strategy)
  - [Facade](#facade)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **WeTest Framework Blueprint** provides a production-ready foundation for test automation projects. It demonstrates industry best practices and design patterns that enable teams to:

- Build maintainable and scalable test suites
- Implement cross-browser testing strategies
- Organize code with clear separation of concerns
- Leverage powerful helpers and utilities for common testing tasks
- Integrate with CI/CD pipelines seamlessly

This framework is designed to be immediately usable as a template for your own projects, with clear examples and well-documented code patterns.

---

## Key Features

✅ **Playwright Integration** - Modern browser automation with Chromium, Firefox, and WebKit support  
✅ **TypeScript Support** - Full type safety and IntelliSense for better development experience  
✅ **Multi-Browser Testing** - Configured for parallel execution across multiple browsers  
✅ **Organized Architecture** - Clear separation between UI tests, API tests, and support code  
✅ **Reusable Utilities** - Comprehensive helpers for actions, assertions, data handling, and more  
✅ **Environment Management** - Support for multiple environments and configuration management  
✅ **Test Data Management** - Dedicated structure for test data organization  
✅ **Logging & Reporting** - HTML reports and detailed execution traces  
✅ **Page Object Pattern** - Maintainable test code using Page Object Model  
✅ **CI/CD Ready** - Pre-configured for continuous integration pipelines  

---

## Project Structure

```
WeTest-Framework-Blueprint/
├── tests/
│   ├── api/                    # API test specifications
│   └── ui/                     # UI test specifications
├── support/
│   ├── config/                 # Configuration files (polling, timeouts, etc.)
│   ├── enums/                  # Enumerations (HTTP status, durations, regex patterns)
│   ├── environment/            # Environment-specific settings
│   ├── interfaces/             # TypeScript interfaces & type definitions
│   ├── openAPI-specs/          # API specifications for reference
│   ├── pages/                  # Page Object Model definitions
│   ├── test-data/              # Test data fixtures and datasets
│   └── utils/
│       ├── helpers/            # Reusable helper functions
│       │   ├── actionHelper.ts       # DOM interaction helpers
│       │   ├── assertionHelper.ts    # Custom assertion helpers
│       │   ├── dateHelper.ts         # Date manipulation utilities
│       │   ├── dbHelper.ts           # Database interaction helpers
│       │   ├── fileHelper.ts         # File operation helpers
│       │   ├── jsonHelper.ts         # JSON parsing & manipulation
│       │   └── testDataHelper.ts     # Test data management
│       ├── fixtures/           # Playwright fixtures
│       └── logger.ts           # Logging utilities
├── assets/
│   ├── csv/                    # CSV test data files
│   ├── excel/                  # Excel test data files
│   └── snapshots/              # Visual regression snapshots
├── CI/                         # CI/CD configuration files
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.ts            # ESLint configuration
└── package.json                # Project dependencies

```

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lars-db/WeTest-Framework-Blueprint.git
   cd WeTest-Framework-Blueprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables** (if needed)
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

---

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in a specific directory
```bash
npx playwright test tests/ui
npx playwright test tests/api
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run a single test file
```bash
npx playwright test tests/ui/example.spec.ts
```

### Run tests matching a pattern
```bash
npx playwright test -g "login"
```

### Run tests with debugging
```bash
npx playwright test --debug
```

### Generate and view HTML report
```bash
npx playwright show-report
```

---

## Configuration

### Playwright Configuration

The `playwright.config.ts` file defines:

- **Test directory**: `./tests`
- **Parallel execution**: Enabled by default
- **Retries**: 0 locally, 2 on CI
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Reporter**: HTML report generation
- **Trace collection**: Enabled on first retry

Customize these settings in `playwright.config.ts` to match your requirements.

### Environment Variables

Create a `.env` file in the project root:

```env
BASE_URL=http://localhost:3000
API_BASE_URL=https://api.example.com
LOG_LEVEL=info
TIMEOUT=30000
```

Load variables using `dotenv`:
```typescript
import dotenv from 'dotenv';
dotenv.config();
```

---

## Framework Components

### Logging with Winston

The framework includes a production-grade **Winston logger** configured for enterprise test automation.

#### Features
- **Multiple transports**: Console output during tests + file persistence
- **Custom log levels**: error, warn, info, http, debug, trace
- **Automatic log rotation**: 10MB max file size, 5 files retained per transport
- **JSON formatting**: Structured logging to files for parsing/analysis
- **Color-coded console output**: Easy-to-read colored output during test execution
- **Error stack traces**: Automatic capture of stack traces for debugging

#### Basic Usage

The logger is automatically injected as a fixture into all tests:

```typescript
import { test } from '../support/utils/fixtures/testFixture';

test('Example test', async ({ page, logger }) => {
  logger.info('Test started');
  
  await page.goto('/');
  logger.debug('Page navigated successfully');
  
  // Perform test actions...
  logger.info('Test completed');
});
```

#### Available Log Levels

| Level | Usage |
|-------|-------|
| `error` | Critical failures and exceptions |
| `warn` | Warning conditions that don't stop execution |
| `info` | General informational messages (default) |
| `http` | HTTP request/response details |
| `debug` | Detailed debugging information |
| `trace` | Most verbose, all internal details |

#### Controlling Log Output

Use the `LOG_LEVEL` environment variable to control console verbosity:

```bash
# Default: info (only shows info, warn, error)
npm test

# Show debug messages
LOG_LEVEL=debug npm test

# Show all messages including trace
LOG_LEVEL=trace npm test

# Only errors
LOG_LEVEL=error npm test
```

#### Log Files

Logs are written to `test-results/logs/`:
- **`combined.log`**: All messages at trace level and above
- **`error.log`**: Error messages only (useful for quick failure analysis)

#### Custom Logger Creation

For specialized scenarios, create a named logger:

```typescript
import { createLogger } from '../support/utils/logger';

const customLogger = createLogger('MyCustomService');
customLogger.info('Custom logger message');
```

---

### Support Utilities

The framework provides a comprehensive set of helpers:

| Helper | Purpose |
|--------|---------|
| `actionHelper.ts` | Click, fill, navigate, and other DOM interactions |
| `assertionHelper.ts` | Custom assertions and validations |
| `dateHelper.ts` | Date/time formatting and calculations |
| `dbHelper.ts` | Database queries and transactions |
| `fileHelper.ts` | File read/write operations |
| `jsonHelper.ts` | JSON parsing, validation, and manipulation |
| `testDataHelper.ts` | Test data generation and management |

### Page Object Model

Organize page-specific code in the `support/pages/` directory:

```typescript
// Example: LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="submit"]');
  }

  async isLoggedIn(): Promise<boolean> {
    return !!(await this.page.$('[data-testid="user-menu"]'));
  }
}
```

### Test Data Management

Store test data in `support/test-data/` and use helpers to access it:

```typescript
// Use the testDataHelper to manage test data
const userData = await testDataHelper.getUserData();
```

### Configuration & Enums

Define application constants in `support/enums/`:

```typescript
// httpStatus.ts
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

// durations.ts
export enum Duration {
  SHORT = 1000,
  MEDIUM = 5000,
  LONG = 10000,
}
```

---

## Design Patterns

The framework applies four design patterns to keep tests readable and the support layer maintainable. Each pattern has a single, well-defined responsibility.

---

### Builder

**Location:** `support/utils/builders/`

The Builder pattern solves the problem of constructing complex request bodies inside tests. Without it, every test that creates a product or registers a user must supply all fields inline — repetitive, fragile, and hard to read.

| File | What it builds |
|---|---|
| `productBuilder.ts` | `ProductRequest` payload — 8 fields, most optional. Fluent helpers like `.asRental()` and `.asLocationOffer()` make intent clear without noise. |
| `userBuilder.ts` | `UserRequest` payload — required fields with defaults, nested `address` object, and a `Date.now()` email so every `build()` produces a unique user. |

```typescript
// Without Builder
const payload = { name: 'Hammer', price: 12.99, category_id: '01', brand_id: '01',
                  description: '...', product_image_id: '01', is_rental: false, is_location_offer: false };

// With Builder
const payload = new ProductBuilder().withName('Hammer').withPrice(12.99).build();
const rental  = new ProductBuilder().withName('Grinder').asRental().build();
```

---

### Factory

**Location:** `support/utils/factories/`

The Factory pattern provides named presets for objects that tests need repeatedly. It is the single source of truth for seeded account credentials and common product configurations — one place to update when data changes.

| File | What it produces |
|---|---|
| `userFactory.ts` | Pre-configured credentials for `customer()` and `admin()`. The `byRole()` method selects by role name, and `token()` logs in and returns a Bearer token in one call. |
| `productFactory.ts` | Product payloads for `standard()`, `rental()`, and `locationOffer()` variants. The `withOverrides()` method handles one-off variations without a full builder chain. |

```typescript
// UserFactory — known accounts
const creds = UserFactory.customer();            // { email, password }
const token = await UserFactory.token(request, 'admin');

// ProductFactory — preset configurations
const product  = ProductFactory.standard();
const rental   = ProductFactory.rental();
const modified = ProductFactory.withOverrides({ price: 4.99 });
```

---

### Strategy

**Location:** `support/utils/strategies/authStrategy.ts`

The Strategy pattern makes authentication behaviour swappable without changing the test body. Tests depend on the `AuthStrategy` interface, not on a specific implementation. Changing the role under test is a one-line change.

```typescript
export interface AuthStrategy {
    getToken(request: APIRequestContext): Promise<string>;
}

export class CustomerAuthStrategy implements AuthStrategy { ... }
export class AdminAuthStrategy implements AuthStrategy { ... }
```

```typescript
// Swap the strategy — test body stays identical
const strategy: AuthStrategy = new AdminAuthStrategy();
const token = await strategy.getToken(request);
const result = await ProductsApiHelper.create(request, token, payload);
```

---

### Facade

**Location:** `support/utils/helpers/apiHelpers/` · `support/utils/fixtures/testFixture.ts`

The Facade pattern hides framework complexity behind a clean surface. Callers get a simple method; the details of headers, URL construction, JSON parsing, and multi-step flows stay inside the helper.

Two levels of facade exist in this framework:

**1. Individual methods** — each method on a helper class is a facade over a raw HTTP call. The caller passes `request` and gets an `ApiResult<T>` back.

```typescript
// No headers, no URL building, no JSON parsing in the test
const result = await UserApiHelper.login(request, UserFactory.customer());
expect(result.status).toBe(HttpStatus.OK);
```

**2. Compound methods** — `UserApiHelper.registerAndLogin()` combines two HTTP calls into one. The test receives a ready-to-use token; the intermediate register/login responses are never visible.

```typescript
const payload = new UserBuilder().withEmail('new@test.com').build();
const token   = await UserApiHelper.registerAndLogin(request, payload);
// token is ready to use — no register/login steps in the test body
```

`testFixture.ts` is the UI facade: it exposes `page`, `loginPage`, `homePage`, `assertionHelper`, and more as a single import so tests never construct these objects individually.

---

## Best Practices

### 1. **Use Page Objects**
Encapsulate page interactions in Page Object classes to improve maintainability.

### 2. **Organize Tests Logically**
Group related tests in spec files, separated by feature or functionality.

### 3. **Leverage Fixtures**
Create Playwright fixtures for setup/teardown and shared test utilities.

### 4. **Keep Tests Independent**
Each test should be able to run in isolation without depending on other tests.

### 5. **Use Meaningful Names**
Write clear, descriptive test names that explain what is being tested.

```typescript
test('should display validation error when email is invalid', async ({ page }) => {
  // test implementation
});
```

### 6. **Implement Proper Waits**
Use Playwright's built-in waiting mechanisms instead of hardcoded delays.

```typescript
await page.waitForSelector('[data-testid="success-message"]');
```

### 7. **Handle Environment Variables**
Use environment variables for URLs, credentials, and configuration.

### 8. **Document Your Code**
Add comments and JSDoc annotations for complex test logic.

### 9. **Version Control**
Exclude sensitive data (credentials, API keys) from git using `.gitignore`.

### 10. **CI/CD Integration**
Configure your project to run tests automatically on commits and pull requests.

---

## Project Setup for Your Own Framework

To use this blueprint as a starting point for your project:

1. Clone or fork this repository
2. Update `package.json` with your project name and details
3. Customize `playwright.config.ts` for your application
4. Create Page Objects in `support/pages/` for your application
5. Add your test specifications in `tests/ui/` and `tests/api/`
6. Configure environment variables in `.env`
7. Start writing tests!

---

## Contributing

Contributions are welcome! To contribute to this blueprint:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Resources

- 📚 [Playwright Documentation](https://playwright.dev)
- 📚 [TypeScript Documentation](https://www.typescriptlang.org)
- 📚 [Test Automation Best Practices](https://playwright.dev/docs/best-practices)
- 🎥 [WeTest Conference](https://www.wetest-athens.gr/)

---

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## About

**Author**: Lars de Bruijn  
**Repository**: [Lars-db/WeTest-Framework-Blueprint](https://github.com/Lars-db/WeTest-Framework-Blueprint)

**Presented at**: WeTest Conference 2026

---

## Questions & Support

For questions, issues, or suggestions, please open an issue on [GitHub Issues](https://github.com/Lars-db/WeTest-Framework-Blueprint/issues).

**Happy Testing! 🚀**

---

[![Run Playwright Tests 🎭](https://github.com/testsmith-io/practice-software-testing/actions/workflows/run-tests.yml/badge.svg)](https://github.com/testsmith-io/practice-software-testing/actions/workflows/run-tests.yml) [![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/testsmith-io/practice-software-testing)


# Default accounts

| First name | Last name | Role   | E-mail                                | Password   |
|------------|-----------|--------|---------------------------------------|------------|
| John       | Doe       | admin  | admin@practicesoftwaretesting.com     | welcome01  |
| Jane       | Doe       | user   | customer@practicesoftwaretesting.com  | welcome01  |
| Jack       | Howe      | user   | customer2@practicesoftwaretesting.com | welcome01  |
| Bob        | Smith     | user   | customer3@practicesoftwaretesting.com | pass123    |

# URLs (hosted versions)

| Description          | Application                                                                                    | API                                                                                                           | Swagger                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Sprint 1             | [https://v1.practicesoftwaretesting.com](https://v1.practicesoftwaretesting.com)               | [https://api-v1.practicesoftwaretesting.com](https://api-v1.practicesoftwaretesting.com/status)               | [https://api-v1.practicesoftwaretesting.com](https://api-v1.practicesoftwaretesting.com/api/documentation)               |
| Sprint 2             | [https://v2.practicesoftwaretesting.com](https://v2.practicesoftwaretesting.com)               | [https://api-v2.practicesoftwaretesting.com](https://api-v2.practicesoftwaretesting.com/status)               | [https://api-v2.practicesoftwaretesting.com](https://api-v2.practicesoftwaretesting.com/api/documentation)               |
| Sprint 3             | [https://v3.practicesoftwaretesting.com](https://v3.practicesoftwaretesting.com)               | [https://api-v3.practicesoftwaretesting.com](https://api-v3.practicesoftwaretesting.com/status)               | [https://api-v3.practicesoftwaretesting.com](https://api-v3.practicesoftwaretesting.com/api/documentation)               |
| Sprint 4             | [https://v4.practicesoftwaretesting.com](https://v4.practicesoftwaretesting.com)               | [https://api-v4.practicesoftwaretesting.com](https://api-v4.practicesoftwaretesting.com/status)               | [https://api-v4.practicesoftwaretesting.com](https://api-v4.practicesoftwaretesting.com/api/documentation)               |
| Sprint 5             | [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)                     | [https://api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com/status)                     | [https://api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com/api/documentation)                     |
| Sprint 5 (with bugs) | [https://with-bugs.practicesoftwaretesting.com](https://with-bugs.practicesoftwaretesting.com) | [https://api-with-bugs.practicesoftwaretesting.com](https://api-with-bugs.practicesoftwaretesting.com/status) | [https://api-with-bugs.practicesoftwaretesting.com](https://api-with-bugs.practicesoftwaretesting.com/api/documentation) |

## Mobile App

The mobile app is fully integrated with version 4 of Practice Software Testing, which means both share the same environment. Any changes you make through the mobile app (like creating or editing data) will appear on the website, and updates on the website will also show up in the app.

[Android Mobile APK](https://testsmith.s3.eu-central-1.amazonaws.com/artifacts/practice-software-testing.apk)

[iOS Simulator App](https://testsmith.s3.eu-central-1.amazonaws.com/artifacts/practice-software-testing.zip)

# Using the docker containers

I will take up to 5 minutes (depending on your internet connection speed), if you run `docker compose up -d` for the first
time. Any subsequent `docker compose up -d` will take seconds. You may need to add sudo before the docker command `sudo docker compose up -d`

All images together are less than 1,5 GB.

## 🐳 Docker Compose Setup

This project includes multiple Docker Compose configurations to support development, testing, and production usage.

### 🔧 Local Development (with live-reloading, source-mounted volumes)

Use this when actively working on the application:

```bash
docker compose up -d
```

This will:

* Build the containers from local source (`docker-compose.yml`)
* Mount the source code for live changes
* Automatically include `docker-compose.override.yml` (mailcatcher, cron, phpmyadmin)

### 🧪 Development + Excluding Optional Services

To start the bare minimum:

```bash
docker compose -f docker-compose.yml up -d
```
This will:

* Use only what's defined in docker-compose.yml
* Ignore docker-compose.override.yml completely
* Skip optional services like cron, phpmyadmin, mailcatcher


### 🚀 Production Setup (with prebuilt Docker images)

```bash
docker compose -f docker-compose.prod.yml up --pull missing -d
```

## URL's (local version)

| URL                                                                                | Description           |
|------------------------------------------------------------------------------------|-----------------------|
| [http://localhost:8091](http://localhost:8091)                                     | (REST) API            |
| [http://localhost:8091/api/documentation](http://localhost:8091/api/documentation) | Swagger               |
| [http://localhost:1080](http://localhost:1080)                                     | MailCatcher           |
| [http://localhost:4200](http://localhost:4200)                                     | (Angular) Application |
| [http://localhost:8000](http://localhost:8000) (`root`/`root`)                     | PHPMyAdmin            |

## Switch sprint

Update the `SPRINT` in [.env](.env) to use the proper version that belongs to the sprint.

## Roll Back - Run Migrations - Seed Database

`docker compose exec laravel-api php artisan migrate:fresh --seed`

## Migrate database schema

`docker compose exec laravel-api php artisan migrate`

## Seed database

`docker compose exec laravel-api php artisan db:seed`

## Access to the Laravel Logs

`docker-compose exec laravel-api tail -f storage/logs/laravel.log`

## Generate Swagger documentation

`docker compose exec laravel-api php artisan l5-swagger:generate`

## Update order status

`docker compose exec laravel-api php artisan order:update`

## Remove PDF documents

`docker compose exec laravel-api php artisan invoice:remove`

## Generate PDF documents

`docker compose exec laravel-api php artisan invoice:generate`

## Execute unit tests (sprint 1 to sprint 4)

`./vendor/bin/phpunit`

## Execute unit tests (sprint 5)

`./vendor/bin/pest`

## Execute unit tests with coverage

`XDEBUG_MODE=coverage ./vendor/bin/phpunit --coverage-html tests/coverage`

## Start pact-mock-service

`pact-mock-service start --host localhost --port 7203 --consumer AnyConsumer --provider ProductAPI --pact-dir ./pacts --log ./storage/logs/pact.log`

## Stop pact-mock-service

`pact-mock-service stop --port 7203`

# Sprints

## Sprint 0

During this initial sprint, we made some architectural decisions. We decided to implement a
super-fast [Laravel](https://laravel.com/) API, as well as an [Angular](https://angular.io/) frontend.

Every developer or tester can spin up the environment on its own machine. This makes testing easier, and it
allows you to manipulate data.

The deliverable of Sprint0 is a Dockerized environment, just like database seeding scripts. Basically, the result is
an empty environment.

# Support This Project

If you find this project useful and want to support its ongoing development, please consider [supporting](https://testwithroy.com/b/support) it!

I appreciate your support!

# License

This repository is publicly viewable for reference purposes only.

Commercial use, public hosting, redistribution, and use for third-party services are not allowed without prior written permission. See [LICENSE](LICENSE) for details.

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

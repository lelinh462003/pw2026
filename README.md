# Playwright Automation Testing Project

A comprehensive Playwright testing suite with tests for various web applications and scenarios including form interactions, table data verification, flight bookings, and more.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Suites](#test-suites)
- [Page Objects](#page-objects)
- [Fixtures](#fixtures)
- [Configuration](#configuration)

## 🎯 Project Overview

This project contains end-to-end automation tests using Playwright framework. It includes:

- **The Internet Tests**: Comprehensive tests for [TheInternet](http://the-internet.herokuapp.com/) application
- **Flight Booking Tests**: Automation tests for flight booking flows
- **Hotel Booking Tests**: Tests for hotel/accommodation booking
- **Custom Fixtures**: Specialized test fixtures for complex scenarios
- **Page Object Model**: Well-organized page objects for maintainable tests

## 📦 Prerequisites

- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager

## 🚀 Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd my-playwright-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (if not already installed):
   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```
my-playwright-project/
├── tests/                          # Test files directory
│   ├── example.spec.ts            # Example test
│   ├── Hover.spec.ts              # Hover interaction tests
│   ├── the-internet/              # The Internet application tests
│   │   ├── Alert.spec.ts
│   │   ├── checkbox.spec.ts
│   │   ├── dragdrop.spec.ts
│   │   ├── dropdown.spec.ts
│   │   ├── frame.spec.ts
│   │   ├── Table.spec.ts
│   │   ├── Table1.spec.ts
│   │   ├── Table2.spec.ts
│   │   ├── login.spec.ts
│   │   ├── upload.spec.ts
│   │   └── ... (more tests)
│   ├── flight-booking/            # Flight booking automation
│   │   └── vn-airline.spec.ts
│   ├── Buoi4/                     # Session 4 tests
│   │   └── flight.spec.ts
│   ├── booker/                    # Hotel booking tests
│   │   └── booking.spec.ts
│   ├── pages/                     # Page Object Model
│   │   ├── checkboxes.page.ts
│   │   ├── login.page.ts
│   │   └── table.page.ts
│   ├── fixtures/                  # Test fixtures
│   │   └── the-internet.fixture.ts
│   └── resources/                 # Test resources
│       ├── download/              # Files for download tests
│       └── upload/                # Files for upload tests
├── docs/                          # Documentation
│   └── playwright-ts-setup-guide.md
├── playwright-report/             # HTML test reports
├── test-results/                  # Test results artifacts
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in a Specific File
```bash
npx playwright test tests/the-internet/checkbox.spec.ts
```

### Run Tests by Pattern
```bash
npx playwright test --grep "checkbox"
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### Run Tests with Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Generate and View HTML Report
```bash
npx playwright test
npx playwright show-report
```

## 📊 Test Suites

### The Internet Tests (`tests/the-internet/`)
Comprehensive tests for the test application at http://the-internet.herokuapp.com/

- **Alert Tests**: JavaScript alerts and confirmations
- **Checkbox Tests**: Checkbox interactions and state management
- **Dropdown Tests**: Select dropdown interactions
- **Drag & Drop**: Mouse drag operations
- **Frame Tests**: Frame and iframe navigation
- **Login Tests**: Authentication flows
- **Table Tests**: HTML table data extraction and validation
- **Upload/Download**: File operations
- **Hover**: Mouse hover interactions
- **Context**: Browser context handling
- **Right Click**: Context menu interactions
- **Nested Frames**: Complex frame hierarchies
- **Horizontal Slider**: Range input interactions
- **Hyperlink Navigation**: Link clicking and validation
- **Screenshot & Snapshots**: Visual regression testing
- **Broken Images**: Image verification
- **Web Tables**: Dynamic table handling

### Flight Booking Tests (`tests/flight-booking/`, `tests/Buoi4/`)
- Vietnam Airline booking automation
- Flight search and selection flows
- Booking confirmation

### Hotel Booking Tests (`tests/booker/`)
- Accommodation booking automation
- Reservation workflows

## 🏗️ Page Objects

Page objects are located in `tests/pages/` and provide reusable methods for interacting with specific pages:

- **checkboxes.page.ts**: Checkbox selection and verification
- **login.page.ts**: Login form interactions
- **table.page.ts**: Table data extraction and sorting

## 🔧 Fixtures

Custom fixtures are available in `tests/fixtures/`:

- **the-internet.fixture.ts**: Pre-configured fixture for The Internet application tests

## ⚙️ Configuration

The project is configured via `playwright.config.ts`:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled by default
- **Reporter**: HTML reports (generated in `playwright-report/`)
- **Retries**: 0 on local, 2 on CI environment
- **Workers**: Unlimited on local, 1 on CI environment

### Key Configuration Options

You can modify `playwright.config.ts` to:
- Change test timeout
- Configure base URL for `page.goto('')`
- Adjust parallel worker count
- Configure different browsers and devices
- Set up environment variables

## 📝 Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## 🛠️ Development

### TypeScript Support

The project includes TypeScript support with:
- `@playwright/test` for test framework
- `@types/node` for Node.js types

### Add New Tests

1. Create a new `.spec.ts` file in appropriate folder under `tests/`
2. Import Playwright test utilities
3. Write your test cases
4. Follow the Page Object Model pattern for reusable components

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [The Internet Test Application](http://the-internet.herokuapp.com/)
- [Test Resources](./tests/resources/) - Contains sample files for upload/download tests

## 🔄 Continuous Integration

The configuration includes CI environment detection:
- Tests run with 2 retries on CI
- Tests run sequentially (1 worker) on CI
- Forbid `test.only` statements on CI

## 📄 License

ISC

## 🤝 Contributing

Follow the project structure and patterns:
- Keep tests modular and focused
- Use page objects for UI interactions
- Organize tests by feature/application
- Add appropriate test descriptions and comments

---

For more information, see [Playwright TypeScript Setup Guide](./docs/playwright-ts-setup-guide.md)

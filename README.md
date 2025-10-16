# E2E Testing Framework with Playwright and JavaScript

## Project Overview
A comprehensive end-to-end testing framework built with Playwright and JavaScript, demonstrating professional test automation practices. This project implements the Page Object Model pattern and showcases automated testing of an e-commerce platform.

## 🛠 Tech Stack
- **Testing Framework**: Playwright with @playwright/test
- **Language**: JavaScript (Node.js)
- **Design Pattern**: Page Object Model (POM)
- **Data Generation**: Faker.js
- **Configuration**: Environment variables support with dotenv
- **Reporting**: Built-in HTML reporter
- **CI Support**: Configured for CI/CD integration

## 🏗 Project Structure
```
practicing-playwright-javascript/
├─ components/              # Reusable UI components
│  ├─ alert-error.js
│  ├─ alert-success.js
│  ├─ base-component.js
│  └─ navbar.js
├─ pages/                   # Page Object Model implementations
│  ├─ base-page.js
│  ├─ home-page.js
│  ├─ login-page.js
│  └─ register-page.js
├─ tests/                   # Test specifications
│  ├─ test-homepage.spec.js
│  ├─ test-login.spec.js
│  └─ test-register.spec.js
├─ playwright.config.js     # Playwright configuration
└─ package.json
```

## ✨ Features
- **Modular Architecture**: Well-organized code structure using Page Object Model
- **Component-Based Design**: Reusable UI components for maintainable test code
- **Cross-Browser Testing**: Configured for multiple browser testing (Chromium, Firefox)
- **Parallel Execution**: Tests run in parallel for faster feedback
- **Rich Reporting**: Built-in HTML reports with traces and screenshots
- **CI/CD Ready**: Configured for continuous integration environments
- **Environment Management**: Support for multiple test environments via configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm package manager

### Installation
```bash
# Install dependencies
npm install

# Install browsers and dependencies
npx playwright install --with-deps
```

### Running Tests
```bash
# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test tests/test-login.spec.js

# Run tests matching description
npx playwright test -g "Login"
```

## 📊 Test Reports and Artifacts
- **HTML Reports**: Available in `playwright-report/` directory
- **Test Artifacts**: Screenshots, videos, and traces in `test-results/`
- **View Reports**: `npx playwright show-report`

## ⚙️ Configuration
The framework is highly configurable through `playwright.config.js`:
- Base URL configuration for different environments
- Parallel execution settings
- Retry logic for failed tests
- Browser configurations
- Screenshot and video capture settings
- CI/CD specific configurations

## 🧪 Test Coverage
- **Authentication Flows**: Login and registration scenarios
- **Homepage Validation**: Core functionality tests
- **Error Handling**: Validation of error states and messages
- **Cross-Browser Compatibility**: Tests across different browsers

## 💡 Best Practices Implemented
- Page Object Model for better maintainability
- Component reusability
- Robust error handling
- Environment-specific configurations
- Comprehensive reporting
- CI/CD integration support

## 📝 License
ISC

---
*This project demonstrates expertise in test automation, software quality assurance, and modern testing practices using industry-standard tools and frameworks.*


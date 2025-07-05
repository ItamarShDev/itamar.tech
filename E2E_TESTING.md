# E2E Testing Setup

This repository includes comprehensive end-to-end (E2E) tests for all pages using Vitest and Playwright.

## Test Structure

The E2E tests are organized in the `/e2e` directory with the following test files:

- `home.spec.ts` - Tests the home page in both English and Hebrew
- `blog.spec.ts` - Tests blog listing and individual blog posts
- `resume.spec.ts` - Tests the resume page
- `example-projects.spec.ts` - Tests the example projects listing page
- `individual-projects.spec.ts` - Tests all individual project pages
- `navigation.spec.ts` - Tests navigation, language switching, and theme switching
- `smoke-test.spec.ts` - Comprehensive smoke tests covering all pages with SEO and responsiveness

## Running Tests

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

### Available Test Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode (interactive)
npm run test:e2e:ui

# Run unit tests (vitest)
npm run test

# Run unit tests with UI
npm run test:ui
```

### Test Features

The E2E tests cover:

- ✅ **Multi-language support**: Tests both English (`/en`) and Hebrew (`/he`) routes
- ✅ **Responsive design**: Tests mobile and desktop viewports
- ✅ **Navigation**: Tests internal navigation between pages
- ✅ **Language switching**: Tests the language toggle functionality
- ✅ **Theme switching**: Tests dark/light/custom theme switching
- ✅ **Accessibility**: Basic accessibility checks for proper markup
- ✅ **SEO**: Meta tags and proper page titles
- ✅ **Performance**: Tests with simulated slow network conditions
- ✅ **Error handling**: Tests 404 pages and error states

### Test Configuration

- **Playwright Config**: `playwright.config.ts`
- **Vitest Config**: `vitest.config.ts`
- **Test Setup**: `test/setup.ts`

### Development

When running tests locally, the test suite will:

1. Start the Next.js development server automatically
2. Run tests against `http://localhost:3000`
3. Test multiple browsers (Chromium, Firefox, WebKit)
4. Generate HTML reports for test results

### CI/CD Integration

The tests are configured to run efficiently in CI environments with:
- Retry logic for flaky tests
- Parallel execution disabled in CI for stability
- HTML reports for test results
- Screenshot capture on failures

### Pages Tested

All pages in the application are covered:

**Main Pages:**
- Home page (`/en`, `/he`)
- Blog listing (`/en/blog`, `/he/blog`)
- Individual blog posts (`/en/blog/[slug]`, `/he/blog/[slug]`)
- Resume page (`/en/resume`, `/he/resume`)
- Example projects listing (`/en/example-projects`, `/he/example-projects`)

**Example Project Pages:**
- Generator Traffic (`/en/example-projects/generator-traffic`)
- Charts Communications (`/en/example-projects/charts-communications`)
- Translated Text (`/en/example-projects/translated-text`)
- Proxy State (`/en/example-projects/proxy-state`)
- AI Chat (`/en/example-projects/ai-chat`)

Each page is tested in both English and Hebrew to ensure internationalization works correctly.
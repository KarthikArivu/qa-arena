const { defineConfig } = require('@playwright/test');
const fs = require('node:fs');
if (fs.existsSync('.env')) process.loadEnvFile('.env');
const { getEnvironment } = require('./utils/environment-utility');
const { getViewType } = require('./utils/view-type');
const { toBoolean } = require('./utils/common-utility');

const environment = getEnvironment();
const ci = Boolean(process.env.CI);
const headless = toBoolean(process.env.HEADLESS, true);

module.exports = defineConfig({
  testDir: './tests',
  timeout: environment.timeoutMs,
  expect: { timeout: environment.expectTimeoutMs },
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  workers: ci ? 2 : undefined,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'tests-results/junit.xml' }],
    ['html', { outputFolder: 'playwright-reports/html', open: 'never' }],
  ],
  outputDir: 'tests-results/artifacts',
  use: {
    baseURL: environment.baseURL,
    headless,
    viewport: getViewType(process.env.VIEW_TYPE || 'desktop'),
    actionTimeout: 10000,
    navigationTimeout: 15000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testMatch: '**/tests/{UI,E2E}/**/*.spec.js',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      testMatch: '**/tests/{UI,E2E}/**/*.spec.js',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      testMatch: '**/tests/{UI,E2E}/**/*.spec.js',
      use: { browserName: 'webkit' },
    },
    {
      name: 'api',
      testMatch: '**/tests/API/**/*.spec.js',
      use: { browserName: 'chromium' },
    },
  ],
});


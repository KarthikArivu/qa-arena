# QA Automation Arena Playwright Framework

JavaScript and Playwright Test framework built for the public QA Automation Arena at [qa-automation-arena-karthik-personal-project.vercel.app](https://qa-automation-arena-karthik-personal-project.vercel.app/). The test examples use the app's 12 automation modules and its stable `data-testid` attributes.

The linked GitHub repository, `KarthikArivu/qa-arena`, was empty when inspected. The framework source was not present in the local workspace, so this project follows the requested folder layout. The app currently exposes interactive browser testing challenges, including a simulated HTTP status module; no separate REST API contract was visible. The API suite checks the real page response and exercises the app's HTTP status scenarios through its network UI; it does not invent backend endpoints. `utils/api-Utility.js` is ready to support a real API if one is added or provided.

## Architecture

```text
config/environment.json       Environment names, app URLs, and timeouts
data/                          Reusable form inputs and upload fixture
logging/                       Local structured logs (generated)
payloads/                      Future real API request bodies
routes/app-routes.js            App and same-origin resource paths
pages/                          Arena, form, and network page objects
tests/UI/                       Forms, async, dialogs, frames, tables, a11y
tests/API/                      App's simulated HTTP status behavior
tests/E2E/                      Candidate application submission workflow
utils/                          API, assertions, environment, logger, helpers
playwright-reports/              HTML report output
tests-results/                   JUnit, traces, screenshots, and video output
.github/workflows/               GitHub Actions CI
Jenkinsfile                      Jenkins pipeline
Dockerfile                       Version-matched Playwright container
```

Page objects hold stable locators and actions. Tests own the assertions. Playwright's browser and request fixtures isolate test state; UI/E2E tests run in Chromium, Firefox, and WebKit, while the HTTP status challenge runs once. A fresh page is created per test, and the app's table changes remain in that page's isolated browser state.

## Requirements and installation

- Node.js 22 or newer, npm, and Git.
- Install dependencies and the Playwright browsers:

```sh
npm ci
npx playwright install
```

`config/environment.json` currently points `qa`, `staging`, and `development` at the supplied public app. Set `TEST_ENV` to choose a configuration. `BASE_URL` overrides its app URL. Do not use a production URL for tests that mutate application data. `.env` is loaded by the Playwright config for local overrides and is ignored by Git; copy `.env.example` as a starting point.

## Commands

```sh
npm test                 # all suites: UI, API simulation, and E2E
npm run test:ui          # UI in Chromium
npm run test:api         # HTTP status simulation once
npm run test:e2e         # application submission in Chromium
npm run test:chromium    # UI and E2E in Chromium
npm run test:firefox     # UI and E2E in Firefox
npm run test:webkit      # UI and E2E in WebKit
npm run test:headed      # visible Chromium browser
npm run test:debug       # Playwright Inspector
npm run report           # open HTML report
```

PowerShell example:

```powershell
$env:TEST_ENV = 'qa'
$env:BASE_URL = 'https://qa-automation-arena-karthik-personal-project.vercel.app'
npm run test:ui
```

`VIEW_TYPE=mobile` or `VIEW_TYPE=tablet` selects a viewport; `desktop` is the default. Playwright auto-waits for locators and assertions. Popup, tab, and dialog tests register the event listener before the action with `Promise.all()`, which prevents missing a fast event.

## Test coverage

- UI forms: input and password toggling, radio/checkbox/select controls, invalid input, and valid submission.
- Async UI: delayed DOM mounting and spinner removal.
- Dialogs: native alert and prompt handling.
- Frames and windows: same-origin iframe interaction and popup lifecycle.
- File transfer: upload selection and a static download event.
- Data and components: dynamic table rows and open shadow DOM.
- Accessibility: keyboard command palette and live announcement.
- API behavior: HTTP GET health check plus simulated 200, 201, 400, 401, 404, and 500 response scenarios.
- E2E: complete a valid application form and verify its success response.

## Add a test

Use the app's documented test IDs and keep user behavior in the page object:

```js
const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');

test('module shows its ready state', async ({ page }) => {
  await new ArenaPage(page).open();
  await expect(page.getByTestId('challenge-card-network-mocking')).toBeVisible();
});
```

If the app adds a REST API, place paths in `routes/`, request bodies in `payloads/`, and use `ApiUtility` with Playwright's `request` fixture. Keep authorization tokens in CI secrets or local `.env`, never in committed config or logs.

## Reports and CI/CD

HTML output is under `playwright-reports/html/`; JUnit XML, screenshots, videos, and traces are under `tests-results/`. Both are ignored by Git. To inspect a failure trace, run `npx playwright show-trace <trace-file>`.

GitHub Actions executes each suite and uploads evidence. Jenkins needs Docker Pipeline and JUnit plugins. Docker and the npm dependency are pinned to Playwright 1.63.0 so browser binaries match the test runner:

```sh
docker build -t qa-arena-playwright .
docker run --rm -e TEST_ENV=qa qa-arena-playwright
```

## Interview walkthrough

Explain how environment selection changes the base URL without changing tests; show a page object and a test that uses web-first assertions; explain why event listeners are set before popups/dialogs; then open the failure trace/report and discuss how CI archives evidence. Point out that the API examples cover the app's simulated status feature because no standalone API contract was exposed.


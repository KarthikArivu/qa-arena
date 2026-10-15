const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('adds a record to the dynamic data table', async ({ page }) => {
  const handle = '@qa_framework_demo';
  await page.getByTestId('input-new-handle').fill(handle);
  await page.getByTestId('btn-add-row').click();

  await expect(page.getByRole('table')).toContainText(handle);
});

test('interacts with the open shadow root component', async ({ page }) => {
  const card = page.getByTestId('challenge-card-open-shadow-dom');
  await page.getByTestId('open-shadow-input').fill('shadow root value');
  await page.getByTestId('open-shadow-btn').click();

  await expect(card).toContainText('shadow root value');
});


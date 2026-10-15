const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('waits for an element mounted after simulated latency', async ({ page }) => {
  await page.getByTestId('btn-trigger-delayed').click();
  await expect(page.getByTestId('delayed-element-target')).toHaveText('✨ DATA LOADED IN DOM SUCCESSFULLY');
});

test('waits for the asynchronous loading spinner to disappear', async ({ page }) => {
  const spinner = page.getByTestId('active-spinner');
  await page.getByTestId('btn-start-spinner').click();
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden();
});


const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');

test('keyboard shortcut opens the command palette', async ({ page }) => {
  await new ArenaPage(page).open();
  await page.keyboard.press('Control+k');

  await expect(page.getByText('Export System Analytics Data', { exact: true })).toBeVisible();
});

test('live announcement appears after the trigger is activated', async ({ page }) => {
  await new ArenaPage(page).open();
  const card = page.getByTestId('challenge-card-a11y-focus-tab');
  await page.getByTestId('btn-trigger-announcement').click();

  await expect(card).not.toContainText('No current announcement.');
});


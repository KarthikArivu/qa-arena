const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('accepts the native alert dialog', async ({ page }) => {
  let dialogType;
  const dialogEvent = page.waitForEvent('dialog').then(async (dialog) => {
    dialogType = dialog.type();
    await dialog.accept();
  });
  await Promise.all([dialogEvent, page.getByTestId('btn-native-alert').click()]);
  expect(dialogType).toBe('alert');
});

test('accepts a native prompt and displays the entered value', async ({ page }) => {
  let dialogType;
  const dialogEvent = page.waitForEvent('dialog').then(async (dialog) => {
    dialogType = dialog.type();
    await dialog.accept('Playwright interview demo');
  });
  await Promise.all([dialogEvent, page.getByTestId('btn-native-prompt').click()]);
  expect(dialogType).toBe('prompt');
  await expect(page.getByTestId('challenge-card-native-dialogs')).toContainText('Playwright interview demo');
});


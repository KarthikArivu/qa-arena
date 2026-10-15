const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');
const { capturePopup } = require('../../utils/window-manager');

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('submits data through the simple same-origin iframe', async ({ page }) => {
  const frame = page.frameLocator('#simple-frame');
  await frame.getByRole('textbox').fill('iframe automation check');
  await frame.getByRole('button', { name: 'Send to Host' }).click();
  await expect(frame.getByText(/Verified! Secret unlocked/)).toContainText('iframe automation check');
});

test('captures the popup before triggering its open action', async ({ page }) => {
  const popup = await capturePopup(page, () => page.getByTestId('btn-open-popup-window').click());
  await expect(popup).toHaveURL(/popup-window\.html$/);
  await expect(popup.getByRole('heading')).toBeVisible();
  await popup.close();
});


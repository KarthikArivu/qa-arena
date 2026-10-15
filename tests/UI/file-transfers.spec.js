const path = require('node:path');
const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('selects a local file for upload', async ({ page }) => {
  const fixture = path.join(__dirname, '../../data/sample-upload.txt');
  const fileInput = page.getByTestId('input-single-file');
  await fileInput.setInputFiles(fixture);

  await expect(fileInput).toHaveValue(/sample-upload\.txt$/);
});

test('downloads the static verification record', async ({ page }) => {
  const downloadEvent = page.waitForEvent('download');
  await Promise.all([downloadEvent, page.getByTestId('btn-download-static').click()]);
  const download = await downloadEvent;

  expect(download.suggestedFilename()).toContain('sample-download');
});


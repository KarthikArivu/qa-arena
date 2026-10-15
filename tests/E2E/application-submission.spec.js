const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');
const { FormPage } = require('../../pages/form-page');
const application = require('../../data/application-form.json');

test('candidate submits a valid application and receives confirmation', async ({ page }) => {
  await new ArenaPage(page).open();
  const form = new FormPage(page);

  await form.submitApplication(application.validApplication);

  await expect(form.validationCard).toContainText('VALIDATION PASSED (HTTP 200)');
  await expect(form.validationCard).toContainText('All input criteria verified successfully.');
});


const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');
const { FormPage } = require('../../pages/form-page');
const formData = require('../../data/application-form.json');

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('form controls support text, password visibility, choices, and selections', async ({ page }) => {
  const form = new FormPage(page);
  await form.username.fill('qa_automation_candidate');
  await form.password.fill('demo-only-password');
  await form.passwordToggle.click();
  await expect(form.password).toHaveAttribute('type', 'text');
  await form.passwordToggle.click();
  await expect(form.password).toHaveAttribute('type', 'password');
  await form.description.fill('Demonstrating reliable Playwright form automation.');
  await form.priorityCritical.check();
  await form.auditLogs.check();
  await form.theme.selectOption({ label: 'High Contrast Slate' });

  await expect(form.priorityCritical).toBeChecked();
  await expect(form.auditLogs).toBeChecked();
  await expect(form.theme).toHaveValue('cyberpunk');
  await expect(form.description).toHaveValue('Demonstrating reliable Playwright form automation.');
});

test('form validation rejects a malformed email', async ({ page }) => {
  const form = new FormPage(page);
  await form.email.fill(formData.invalidApplication.email);
  await form.age.fill(formData.validApplication.age);
  await form.terms.check();
  await form.submit.click();

  await expect(form.validationCard).toContainText('Invalid email format. Please provide a valid email address.');
});

test('form validation rejects an age below the supported range', async ({ page }) => {
  const form = new FormPage(page);
  await form.email.fill(formData.validApplication.email);
  await form.age.fill(formData.invalidApplication.age);
  await form.terms.check();
  await form.submit.click();

  await expect(form.validationCard).toContainText('Age must be between 18 and 99 years.');
});

test('valid application displays the success state', async ({ page }) => {
  const form = new FormPage(page);
  await form.submitApplication(formData.validApplication);

  await expect(form.validationCard).toContainText('VALIDATION PASSED (HTTP 200)');
  await expect(form.validationCard).toContainText('All input criteria verified successfully.');
});


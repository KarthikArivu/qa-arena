const { expect } = require('@playwright/test');

async function expectSuccessfulResponse(response, expectedStatus = 200) {
  expect(response.status(), `Expected HTTP ${expectedStatus}, received ${response.status()}`).toBe(expectedStatus);
  expect(response.ok(), 'Expected the response to be successful').toBeTruthy();
}

module.exports = { expectSuccessfulResponse };


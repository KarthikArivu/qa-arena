const { test, expect } = require('@playwright/test');
const { ArenaPage } = require('../../pages/arena-page');
const { NetworkSimulationPage } = require('../../pages/network-simulation-page');

const outcomes = [
  [200, 'HTTP 200 OK'],
  [201, 'HTTP 201 CREATED'],
  [400, 'HTTP 400 BAD REQUEST'],
  [401, 'HTTP 401 UNAUTHORIZED'],
  [404, 'HTTP 404 NOT FOUND'],
  [500, 'HTTP 500 INTERNAL SERVER ERROR'],
];

test.beforeEach(async ({ page }) => {
  await new ArenaPage(page).open();
});

test('application reports the selected simulated HTTP status', async ({ page }) => {
  const network = new NetworkSimulationPage(page);
  for (const [statusCode, expectedMessage] of outcomes) {
    await network.dispatchStatus(statusCode);
    await expect(network.card).toContainText(expectedMessage);
  }
});


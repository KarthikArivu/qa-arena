const { test, expect } = require('@playwright/test');
const { expectSuccessfulResponse } = require('../../utils/assertion-utility');

test('deployed application responds to an HTTP GET request', async ({ request }) => {
  const response = await request.get('/');
  await expectSuccessfulResponse(response, 200);
  expect(response.headers()['content-type']).toContain('text/html');
  expect(await response.text()).toContain('QA Automation Arena');
});

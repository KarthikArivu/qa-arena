const environments = require('../config/environment.json');

function getEnvironment(name = process.env.TEST_ENV || 'qa') {
  const environment = environments[name];
  if (!environment) {
    throw new Error(`Unknown TEST_ENV "${name}". Choose one of: ${Object.keys(environments).join(', ')}`);
  }

  const result = {
    ...environment,
    baseURL: process.env.BASE_URL || environment.baseURL,
    apiBaseURL: process.env.API_BASE_URL || environment.apiBaseURL,
  };

  for (const key of ['baseURL', 'apiBaseURL']) {
    try {
      new URL(result[key]);
    } catch {
      throw new Error(`Invalid ${key} for environment "${name}": ${result[key]}`);
    }
  }
  return result;
}

module.exports = { getEnvironment };


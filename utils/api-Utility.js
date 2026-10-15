const logger = require('./logger-utility');

class ApiUtility {
  constructor(requestContext, baseURL, defaultHeaders = {}) {
    this.request = requestContext;
    this.baseURL = baseURL.replace(/\/$/, '');
    this.defaultHeaders = defaultHeaders;
  }

  async send(method, path, options = {}) {
    const url = `${this.baseURL}/${path.replace(/^\//, '')}`;
    const response = await this.request.fetch(url, {
      ...options,
      method: method.toUpperCase(),
      headers: { ...this.defaultHeaders, ...options.headers },
    });
    logger.info('API response received', { method: method.toUpperCase(), path, status: response.status() });
    return response;
  }

  get(path, options) { return this.send('GET', path, options); }
  post(path, data, options = {}) { return this.send('POST', path, { ...options, data }); }
  put(path, data, options = {}) { return this.send('PUT', path, { ...options, data }); }
  patch(path, data, options = {}) { return this.send('PATCH', path, { ...options, data }); }
  delete(path, options) { return this.send('DELETE', path, options); }
}

module.exports = { ApiUtility };


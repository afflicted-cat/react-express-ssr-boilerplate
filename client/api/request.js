export class RequestApi {
  constructor(baseUrl, defaultOptions) {
    this.baseUrl = baseUrl;
    this.defaultOptions = defaultOptions;
  }

  get(url, options) {
    return this.createRequest('GET', url, options);
  }

  post(url, body, options) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('POST', url, fullOptions);
  }

  put(url, body, options) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('PUT', url, fullOptions);
  }

  patch(url, body, options) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('PATCH', url, fullOptions);
  }

  delete(url, body, options) {
    const fullOptions = Object.assign({}, { body: JSON.stringify(body) }, options);
    return this.createRequest('DELETE', url, fullOptions);
  }

  createRequest(method, url, options) {
    const fullOptions = Object.assign({ method }, this.defaultOptions, options);
    return fetch(`${this.baseUrl}${url}`, fullOptions).then(res => res.json());
  }
}

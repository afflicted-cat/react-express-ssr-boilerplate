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
    const fullUrl = `${this.baseUrl}${url}`;
    return fetch(fullUrl, fullOptions).then(res => {
      if (res.status !== 200) {
        throw new Error(`Failed fetch to ${fullUrl}: ${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }
}

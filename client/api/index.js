import { RequestApi } from './request';

export const initializeApi = fetchUrl => ({
  requestApi: new RequestApi(fetchUrl)
});

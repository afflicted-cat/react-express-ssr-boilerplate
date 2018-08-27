import { merge } from 'ramda';

const defaultConfig = {
  common: {
    env: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isBrowser: process && process.browser,
    basename: '/'
  },
  development: {
    host: process.env.HOST || 'localhost',
    port: process.env.DEV_PORT || 3001,
    apiUrl: ''
  },
  production: {
    host: process.env.HOST || 'localhost',
    port: process.env.PROD_PORT || 8081,
    apiUrl: ''
  }
};

export const config = merge(defaultConfig.common, defaultConfig[defaultConfig.common.env]);

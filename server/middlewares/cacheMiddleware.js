import LRUCache from 'lru-cache';
import express from 'express';

const cacheTime = process.env.SSR_CACHE_TIME ? parseInt(process.env.SSR_CACHE_TIME, 10) : 1000 * 60 * 60;
const cacheEnabled = process.env.SSR_CACHE === 'true';

export const cacheMiddleware = express.Router();

export const ssrCache = new LRUCache({
  maxAge: cacheTime,
  max: 500
});

export const getCacheKey = ({ url }) => `${url}`;

cacheMiddleware.use((req, res, next) => {
  if (cacheEnabled) {
    const key = getCacheKey(req);

    if (ssrCache.has(key)) {
      res.send(ssrCache.get(key));
      return;
    }
  }

  next();
});

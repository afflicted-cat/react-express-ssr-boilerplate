import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { matchRoutes } from 'react-router-config';
import { createMemoryHistory } from 'history';
import express from 'express';
import path from 'path';
import fs from 'fs';

import { appRoutes } from '../../client/common/routes';
import { configureStore } from '../../client/common/store';

import { groupManifestAssets, preloadData, dynamicRequire } from '../lib';
import { cacheMiddleware, getCacheKey, ssrCache } from '../middlewares';
import { renderApp, renderHtml } from '../render';

export const prodRouter = express.Router();

const assetsJson = path.resolve(process.cwd(), 'dist/asset-manifest.json');
const cacheEnabled = process.env.SSR_CACHE === 'true';
let staticFiles = {};

if (fs.existsSync(assetsJson)) {
  staticFiles = dynamicRequire(assetsJson);
}

prodRouter.get('*', cacheMiddleware, async (req, res) => {
  const { css: styles, js: scripts } = groupManifestAssets(staticFiles);
  const history = createMemoryHistory({ initialEntries: [req.url] });
  const sheet = new ServerStyleSheet();
  const url = req.url.split(/[?#]/)[0];
  const context = {};

  const store = configureStore(history);

  const branch = matchRoutes(appRoutes, url);
  const pendingActions = preloadData(branch, store);

  return Promise.all(pendingActions).then(() => {
    if (context.status === 301 || context.status === 302) {
      return res.redirect(context.url, context.status);
    }

    if (context.status === 404) {
      res.status(404);
    }

    const content = renderApp(store, context, req.url, sheet);
    const styledElement = sheet.getStyleElement();
    const initialValues = `
      window.__INITIAL_STATE__ = ${serialize(store.getState())};
    `;

    const html = renderHtml({ content, styles, styledElement, scripts, initialValues });

    if (context.status !== 404 && cacheEnabled) {
      ssrCache.set(getCacheKey(req), html);
    }

    return res.send(html);
  });
});

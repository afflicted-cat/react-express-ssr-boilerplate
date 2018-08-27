import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { renderToStaticMarkup } from 'react-dom/server';
import compression from 'compression';
import webpack from 'webpack';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import React from 'react';
import path from 'path';
import 'isomorphic-fetch';
import './exitHandler';
import './hooks';

import { devRouter, prodRouter } from './routes';
import { dynamicRequire } from './lib';
import { renderHtml } from './render';

const isDevelopment = process.env.NODE_ENV === 'development';
const port = isDevelopment ? process.env.DEV_PORT : process.env.PROD_PORT;
const host = process.env.HOST;
const app = express();

dotenv.config({ silent: false });
app.disable('x-powered-by');
app.use(compression());
app.use(helmet());

if (isDevelopment) {
  const webpackConfig = dynamicRequire(path.resolve(process.cwd(), 'webpack.config'));
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      logLevel: 'error',
      noInfo: true,
      stats: 'errors-only'
    })
  );
  app.use(webpackHotMiddleware(compiler, { log: console.log })); // eslint-disable-line
  app.use('/', devRouter);
} else {
  const httpHeaders = {
    redirect: false,
    maxAge: 31536000,
    lastModified: true
  };
  app.use(express.static(path.resolve(process.cwd(), 'dist'), httpHeaders));
  app.use('/', prodRouter);
}

app.use((err, req, res, next) => {
  const content = renderToStaticMarkup(<div>Server Error</div>);
  res.status(500).send(renderHtml({ content }));
  console.error(err);
  next(err);
});

app.listen(port, error => {
  if (error) {
    return console.error(error);
  }
  return console.info(`✅✅✅ Server is running at http://${host}:${port} ✅✅✅`);
});

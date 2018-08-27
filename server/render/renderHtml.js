import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Html } from './template';

export const renderHtml = props => {
  const html = <Html {...props} />;
  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};

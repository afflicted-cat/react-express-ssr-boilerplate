import React from 'react';
import Helmet from 'react-helmet';

/* eslint-disable react/no-danger, jsx-a11y/html-has-lang */
export function Html({ styles = [], styledElement, scripts = [], content, state = '' }) {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styledElement}
        {styles.map(href => (
          <link key={href} href={href} rel="stylesheet" />
        ))}
        <script dangerouslySetInnerHTML={{ __html: state }} />
      </head>
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        {scripts.map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
}

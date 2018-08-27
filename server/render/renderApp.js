import * as React from 'react';
import { StyleSheetManager } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import { Root } from '../../client/root';

export const renderApp = (store, context, location, sheet) => {
  const appRoot = (
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <StyleSheetManager sheet={sheet.instance}>
          <Root />
        </StyleSheetManager>
      </StaticRouter>
    </Provider>
  );

  return renderToString(appRoot);
};

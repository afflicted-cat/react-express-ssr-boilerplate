import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { injectGlobal } from 'styled-components';
import { createBrowserHistory } from 'history';
import { normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import { configureStore } from 'common/store';
import { Root } from './root';

/* eslint-disable dot-notation, no-unused-expressions */
const initialState = window['__INITIAL_STATE__'];
const history = createBrowserHistory();
const store = configureStore(history, initialState);

delete window['__INITIAL_STATE__'];

injectGlobal`${normalize}`;
/* eslint-enable dot-notation, no-unused-expressions */

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

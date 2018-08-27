import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { initializeApi } from 'api';

import { reducer } from './reducer';
import { config } from './config';

export function configureStore(history, initialState) {
  const api = initializeApi(config.apiUrl);
  let middleware = applyMiddleware(thunk.withExtraArgument(api), routerMiddleware(history));

  if (config.isDevelopment) {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(connectRouter(history)(reducer), initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const { reducer: nextReducer } = require('./reducer');
      store.replaceReducer(connectRouter(history)(nextReducer));
    });
  }

  return store;
}

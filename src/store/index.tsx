import { combineReducers, createStore, applyMiddleware, compose, Reducer, Store } from 'redux';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import appState from 'App/state';
import appReducer from 'App/reducer';
import homeState from 'pages/Home/state';
import homeReducer from 'pages/Home/reducer';
import personState from 'pages/Person/state';
import personReducer from 'pages/Person/reducer';


export type action = { type: string; payload?: any; };
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
export const defaultState = {
  router: {},
  app: appState,
  home: homeState,
  person: personState
};

export default function(initialState = defaultState, url = '/'): [Store, History] {
  const composeEnhancers = !isServer && process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  const history = !isServer ? createBrowserHistory() : createMemoryHistory({
    initialEntries: [url]
  });
  const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk));
  const rootReducer = combineReducers<typeof initialState>({
    router: connectRouter(history) as any,
    app: appReducer,
    home: homeReducer,
    person: personReducer
  });
  const store = createStore<typeof initialState, action, any, any>(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('App/reducer', () => {
      store.replaceReducer(appReducer)
    });

    module.hot.accept('pages/Home/reducer', () => {
      store.replaceReducer(homeReducer)
    });

    module.hot.accept('pages/Person/reducer', () => {
      store.replaceReducer(personReducer)
    });
  }

  return [store, history];
}

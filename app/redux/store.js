import {compose, createStore, applyMiddleware} from 'redux';
import rootReducer from 'reducers';
import createLogger from 'redux-logger';
import apiMiddleware from './api-middleware';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/devtools';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

function initMiddleware() {
  let createStoreWithMiddleware;

  if (__DEV__) {
    createStoreWithMiddleware = compose(
      applyMiddleware(apiMiddleware, thunkMiddleware, loggerMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    )(createStore);
  } else {
    createStoreWithMiddleware = applyMiddleware(apiMiddleware, thunkMiddleware)(createStore);
  }
  return createStoreWithMiddleware;
}

export default function configureStore(initialState) {
  const store = initMiddleware()(rootReducer, initialState);

  // configure hot replacement
  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

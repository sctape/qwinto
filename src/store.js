import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import allReducers from './data/reducers';
import promise from 'redux-promise';

const logger = createLogger();

export default function configureStore(initialState) {
  let middleware = [
    thunk,
    logger,
    promise,
  ];

  const enhancers = [
    applyMiddleware(...middleware),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Qwinto Store',
      }) : compose;

  return createStore(
    allReducers,
    initialState,
    composeEnhancers(...enhancers),
  );
}

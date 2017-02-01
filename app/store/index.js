import { createStore, applyMiddleware } from 'redux';
import reducer from 'app/containers/Root/reducer';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

const isDev = Boolean(process.env.NODE_ENV !== 'production');

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const middleware = isDev ? [logger, sagaMiddleware] : [sagaMiddleware];

  const store = createStore(
    reducer,
    applyMiddleware(
      ...middleware,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require('app/containers/Root/reducer'), () => {
      const nextRootReducer = require('app/containers/Root/reducer');

      store.replaceReducer(nextRootReducer);
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}

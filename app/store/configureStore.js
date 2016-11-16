import { createStore, applyMiddleware } from 'redux';
import reducer from 'app/containers/Root/reducer';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const isDev = Boolean(process.env.NODE_ENV !== 'production');


export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const middleware = isDev ? [logger, sagaMiddleware] : [sagaMiddleware];

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      ...middleware,
    ),
  );
  // When using WebPack, module.hot.accept should be used. In LiveReactload,
  // same result can be achieved by using "module.onReload" hook.
  if (module.onReload) {
    module.onReload(() => {
      store.replaceReducer(reducer.default || reducer);

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true;
    });
  }
  store.runSaga = sagaMiddleware.run;
  return store;
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'app/containers/Router';
import configureStore from './store/configureStore';
import sagas from 'app/containers/Root/saga';

const store = configureStore();

if (module.hot) {
  module.hot.accept();
}

store.runSaga(sagas);

ReactDOM.render(
  (<Provider store={store}>
    <Router />
  </Provider>),
  document.getElementById('app')
);

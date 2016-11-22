import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import saga from 'app/containers/Root/saga';
import Router from './router';

const store = configureStore();

if (module.hot) {
  module.hot.accept();
}

store.runSaga(saga);

ReactDOM.render(
  (<Provider store={store}>
    <Router />
  </Provider>),
  document.getElementById('app')
);

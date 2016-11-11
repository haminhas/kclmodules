import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

//import reducer from 'app/containers/Root/reducer';
//import Router from 'app/containers/Router';

const logger = createLogger();

const isDev = Boolean(process.env.NODE_ENV !== 'prod');
const middleware = isDev ? [logger] : [];

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware),
// );

ReactDOM.render(
    (<h1>Hello World, First Heroku Test </h1>),
  document.getElementById('app')
);

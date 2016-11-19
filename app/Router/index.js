import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Router, browserHistory } from 'react-router';
import Login from 'app/containers/Login';
import Root from 'app/containers/Root/component';
import FourOFour from 'app/components/FourOFour';
import DashBoard from 'app/components/DashBoard';

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  // const redirectAuth = (nextState, replace, callback) => {
  //   const { user: { authenticated }} = store.getState();
  //   if (authenticated) {
  //     replace({
  //       pathname: '/'
  //     });
  //   }
  //   callback();
  // };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
      <IndexRoute component={Login}  />
      <Route onEnter={requireAuth}>
        <Route path="/dashboard" component={DashBoard} />
      </Route>
      <Route path="*" component={FourOFour} />
      </Route>
    </Router>
  );
};

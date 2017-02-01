import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import Login from 'app/containers/Login';
import Root from 'app/containers/Root/component';
import FourOFour from 'app/components/FourOFour';
import DashBoard from 'app/containers/DashBoard';

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRoute component={Login}  />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="*" component={FourOFour} />
      </Route>
    </Router>
  );
};

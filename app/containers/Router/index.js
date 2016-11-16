import React from 'react';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';

import Login from 'app/containers/Login';
import Root from 'app/containers/Root/component';
import FourOFour from 'app/components/FourOFour';
import DashBoard from 'app/components/DashBoard';


export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
      <IndexRoute component={Login} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/auth/Login" component={FourOFour} />
      </Route>
    </Router>
  );
};

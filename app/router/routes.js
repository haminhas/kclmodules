import React from 'react';
import { Router, Route } from 'react-router';

import About from './components/About';
import Login from 'app/containers/Login';
import FourOFour from 'app/components/FourOFour';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Login} />
    <Route path="/about" component={About} />
    <Route path="*" component={FourOFour} />
  </Router>
);

export default Routes;

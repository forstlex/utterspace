import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Listings from '../pages/Listings';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';


const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/listings" component={Listings} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes;
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Listings from '../pages/Listings';
import About from '../pages/About';
import Contact from '../pages/Contact';
import MyListings from '../pages/MyListings';
import BuyListings from '../pages/BuyListings';
import AddListing from '../pages/AddListing';
import BuyInformation from '../pages/BuyInformation';
import Booking from '../pages/BookingPage';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ChatLayout from '../../components/chats/ChatLayout';
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
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/listings" component={Listings} />
        <PrivateRoute exact path="/buy-listings" component={BuyListings} />
        <PrivateRoute exact path="/vendor-info/:id" component={BuyInformation} />
        <PrivateRoute exact path="/booking/:id" component={Booking} />
        <PrivateRoute exact path="/my-listings" component={MyListings} />
        <PrivateRoute exact path="/my-listings/new" component={AddListing} />
        <PrivateRoute exact path="/message/:uid" component={ChatLayout} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes;
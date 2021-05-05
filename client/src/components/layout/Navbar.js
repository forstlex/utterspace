import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {

  const authLinks = (
    <ul>
      <li>
        <Link to="/buy-listings">
          <i className="fa fa-user" />{' '}
          <span className="hide-sm">Buy Listings</span>
        </Link>
      </li>
      <li>
        <Link to="/responds">
          <i className="fa fa-user" />{' '}
          <span className="hide-sm">Respond Booking</span>
        </Link>
      </li>
      <li>
        <Link to="/my-orders">
          <i className="fa fa-user" />{' '}
          <span className="hide-sm">My Orders</span>
        </Link>
      </li>
      <li>
        <Link to="/my-listings">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">My Listings</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/login">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout({user && user.name})</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/my-location">Use my location</Link>
      </li>
      <li>
        <Link to="/listings">Listings</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">RentSpace</Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

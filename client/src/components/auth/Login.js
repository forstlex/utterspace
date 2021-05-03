import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from "socket.io-client";

import { VERIFY_USER, ADD_USER } from "../../events";

import { login } from '../../actions/auth';
import { createMessageSocket } from '../../actions/messages';

const Login = ({ login, isAuthenticated, loginFail, currentUser, createMessageSocket }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [clickLogin, setClickLogin] = useState(false);
  const [socket, setSocket] = useState(null);
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    setClickLogin(true);
    e.preventDefault();
    login(email, password);
  };

  const reconnet = ({ username, isUser }) => {
    if (isUser) {
      // this.setState({ username: "" });
    } else {
      socket.emit(ADD_USER, username);
    }
  };

  if (isAuthenticated) {
    const host = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://utterspace.herokuapp.com/';
    let socket = io.connect(host);
    console.log('SOCKET VALUE:', socket)
    socket.on("connect", () => {
      if (currentUser) {
        socket.emit(VERIFY_USER, currentUser.name, reconnet);
      }
    });
    createMessageSocket(socket);
    // setSocket(socket);
    return <Redirect to="/my-listings" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Login  {clickLogin ? !loginFail && <i className="fas fa-spinner fa-spin" /> : null}</button>
        </div>

      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  createMessageSocket: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  currentUser: PropTypes.object,
  loginFail: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.user,
  loginFail: state.auth.loginFail
});

export default connect(mapStateToProps, { login, createMessageSocket })(Login);

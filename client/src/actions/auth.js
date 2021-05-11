import api from '../utils/api';
import { setAlert } from './alert';
import { loadUserSpaces } from './listings';
import { loadUserMessages } from './messages';
import { loadMyOrders, loadAllOrders } from './booking';
import { loadUserContacts } from './contacts';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    console.log('USER LOGIN BEFORE');
    const res = await api.get('/users/login');
    console.log('API RESPONSE:', res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    dispatch(loadUserSpaces(res.data.currentUser._id));
    dispatch(loadUserMessages(res.data.currentUser._id));
    dispatch(loadMyOrders(res.data.currentUser._id));
    dispatch(loadUserContacts(res.data.currentUser._id));
    dispatch(loadAllOrders());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users/register', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  dispatch({
    type: LOGIN_REQUEST
  })
  try {
    const res = await api.post('/users/login', body);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    console.log('LOAD USER INFORMATION')
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

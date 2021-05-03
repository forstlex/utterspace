import axios from 'axios';

import api from '../utils/api';
import { setAlert } from './alert';
import { ADD_SPACE, DELETE_SPACE, LOAD_USER_SPACES, LOAD_GUEST_SPACES, LOAD_NEAR_SPACES } from './types';

// Add space to sell
export const addSpace = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/spaces', formData);
    dispatch({
      type: ADD_SPACE,
      payload: res.data.space
    });
    history.push('/my-listings');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
};

// Delete space 
export const deleteSpace = (id) => async dispatch => {
  try {
    await api.delete(`/spaces/${id}`);
    dispatch({
      type: DELETE_SPACE,
      payload: id
    })
  } catch (err) {
    console.log(err)
  }
}

// Get all spaces for logged in User
export const loadUserSpaces = (userId) => async dispatch => {
  try {
    const res = await api.get(`/spaces/${userId}`);

    dispatch({
      type: LOAD_USER_SPACES,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
}

export const loadGuestSpaces = () => async dispatch => {
  try {
    const res = await api.get('/spaces/all');
    dispatch({
      type: LOAD_GUEST_SPACES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
}

export const loadNearSpaces = (longitude, latitude) => async dispatch => {
  try {
    const res = await api.get(`/spaces/near?lng=${longitude}&lat=${latitude}`);
    dispatch({
      type: LOAD_NEAR_SPACES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
}

export const getUserLocation = () => async dispatch => {
  try {
    const response = await axios.get('https://geolocation-db.com/json/');
    dispatch(loadNearSpaces(response.data.longitude, response.data.latitude));
  } catch(err) {
    console.log(err);
  }
}
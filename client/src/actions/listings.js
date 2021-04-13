import api from '../utils/api';
import { setAlert } from './alert';
import { ADD_SPACE, LOAD_USERSPACES } from './types';

// Add space to sell
export const addSpace = (formData, history) => async dispatch => {
  try {
    const res = await api.post('/spaces', formData);
    dispatch({
      type: ADD_SPACE,
      payload: res.data.space
    });    
    history.push('/my-listings');
  } catch(err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get all spaces for logged in User

export const loadUserSpaces = (userId) => async dispatch => {
  try {
    const apiValue = "/spaces/" + userId;
    const res = await api.get(apiValue);

    dispatch({
      type: LOAD_USERSPACES,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

export const removeSpace = (listing) => async dispatch => {
  // try {
  //   const res = await api.delete('/listings/value');
  //   disp
  // }
}
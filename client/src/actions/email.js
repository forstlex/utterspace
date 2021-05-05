import api from '../utils/api';
import { SEND_SIGNUP_EMAIL } from './types';
import { setAlert } from './alert';

export const sendSignUpEmail = (email) => async dispatch => {
  try {
    const body = { email };
    await api.post('/emails/signup', body);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
}

export const sendMessageEmail = (url, email) => async dispatch => {
  try {
    const body = { url, email };
    await api.post('/emails/message', body);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
}

export const sendReceiveBookingEmail = (url, email) => async dispatch => {
  try {
    const body = { url, email };
    await api.post('/emails/receive-booking', body);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }

}
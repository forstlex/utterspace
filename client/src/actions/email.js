import api from '../utils/api';
import { SEND_SIGNUP_EMAIL } from './types';
import { setAlert } from './alert';

export const sendSingUpEmail = (email) => async dispatch => {
  try {
    console.log('EMAIL ACTION');
    const body = { email };
    const res = await api.post('/emails/signup', body);
    console.log('EMAIL SENDING RESPONSE:', res)
    dispatch({
      type: SEND_SIGNUP_EMAIL,
      payload: true
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
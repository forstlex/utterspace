import api from '../utils/api';
import { setAlert } from './alert';
import {
  SEND_CONTACT_REQUEST,
  ALL_CONTACT_REQUESTS
} from './types';


export const sendContactRequest = (sellerId, buyerId) => async dispatch => {
  try {
    const res = await api.post('/contacts', { sellerid: sellerId, buyerid: buyerId });
    dispatch({
      type: SEND_CONTACT_REQUEST,
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

export const loadUserContacts = (buyerId) => async dispatch => {
  try {
    const res = await api.get(`/contacts/${buyerId}`);
    dispatch({
      type: ALL_CONTACT_REQUESTS,
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
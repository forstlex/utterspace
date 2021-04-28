import api from '../utils/api';
import { setAlert } from './alert';
import { LOAD_USER_MESSAES, SEND_MESSAGE, ADD_UNREAD_MESSAGE } from './types';

export const sendMessage = (message) => async dispatch => {
  try {
    const res = await api.post('/messages', message);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data
    });
  } catch(err) {

    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
}

export const addUnreadMessage = (message) => dispatch => {
  dispatch({
    type: ADD_UNREAD_MESSAGE,
    payload: { message }
  });
}

export const loadUserMessages = (uId) => async dispatch => {

  try {
    const res = await api.get(`/messages/${uId}`);

    dispatch({
      type: LOAD_USER_MESSAES,
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

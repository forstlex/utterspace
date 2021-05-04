import api from '../utils/api';
import { setAlert } from './alert';
import { CREATE_BOOKING, REMOVE_BOOKING_SPACE, BOOKING_REQUEST, BOOKING_FAILURE, MY_ORDERS } from './types';

// Create booking
export const createBooking = (booking, history) => async dispatch => {
  dispatch({
    type: BOOKING_REQUEST
  })
  try {
    const res = await api.post('/bookings', booking);
    
    dispatch({
      type: CREATE_BOOKING,
      payload: res.data.booking
    });
    dispatch({ type: REMOVE_BOOKING_SPACE, payload: booking.sid });
    history.push('/buy-listings');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
    dispatch({ type: BOOKING_FAILURE })
  }
}

export const loadMyOrders = (buyerId) => async dispatch => {
  try {
    const res = await api.get(`/bookings/${buyerId}`);
    dispatch({
      type: MY_ORDERS,
      payload: res.data.allOrders
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
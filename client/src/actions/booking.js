import api from '../utils/api';
import { setAlert } from './alert';
import { CREATE_BOOKING, REMOVE_BOOKING_SPACE, BOOKING_REQUEST, BOOKING_FAILURE, ALL_ORDERS, MY_ORDERS } from './types';
import { sendReceiveBookingEmail } from './email';

// Create booking
export const createBooking = (booking, host, email, history) => async dispatch => {
  dispatch({
    type: BOOKING_REQUEST
  });
  let bookingId;
  try {
    const res = await api.post('/bookings', booking);
    bookingId = res.data.booking._id;
    dispatch({ type: REMOVE_BOOKING_SPACE, payload: booking.sid });
    dispatch({ type: CREATE_BOOKING, payload: res.data.booking });  
  } catch (err) {
    dispatch({ type: BOOKING_FAILURE });
    if (err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
  }
  if (bookingId) {
    dispatch(sendReceiveBookingEmail(`${host}myorders/${bookingId}`, email));
    history.push('/buy-listings');
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

export const loadAllOrders = () => async dispatch => {
  try {
    const res = await api.get(`/bookings`);
    dispatch({
      type: ALL_ORDERS,
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
import api from '../utils/api';
import { setAlert } from './alert';
import {
  CREATE_BOOKING,
  REMOVE_BOOKING_SPACE,
  BOOKING_REQUEST,
  BOOKING_FAILURE,
  ALL_ORDERS,
  MY_ORDERS,
  ACCEPT_BOOKING_REQUEST,
  ACCEPT_BOOKING_SUCCESS,
  ACCEPT_BOOKING_FAIL,
  REJECT_BOOKING_REQUEST,
  REJECT_BOOKING_SUCCESS,
  REJECT_BOOKING_FAIL,
} from './types';
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
    dispatch(sendReceiveBookingEmail(`${host}responds`, email));
    history.push('/buy-listings');
  }
}

export const acceptBookingRequest = (id) => async dispatch => {
  try {
    const body = { id }
    const res = await api.post('/bookinds/accept', body);
  } catch (err) {
    if (err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert(err.response.statusText, 'danger'));
    }
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

export const clickBookingAccept = (id) => async dispatch => {
  dispatch({
    type: ACCEPT_BOOKING_REQUEST
  });
  const body = { id };
  try {
    await api.post('/bookings/accept', body);
    dispatch({
      type: ACCEPT_BOOKING_SUCCESS
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ACCEPT_BOOKING_FAIL
    });
    dispatch(setAlert('Accept Booking Fail', 'danger'));
  }
}

export const clickBookingReject = (id) => async dispatch => {
  dispatch({
    type: REJECT_BOOKING_REQUEST
  });
  const body = { id };
  try {
    await api.post('/bookings/accept', body);
    dispatch({
      type: REJECT_BOOKING_SUCCESS
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: REJECT_BOOKING_FAIL
    });
    dispatch(setAlert('Reject Booking Fail', 'danger'));
  }
}
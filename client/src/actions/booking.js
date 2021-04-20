import api from '../utils/api';
import { setAlert } from './alert';
import { CREATE_BOOKING, REMOVE_BOOKING_SPACE } from './types';

// Create booking
export const createBooking = (booking, history) => async dispatch => {
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
  }
}
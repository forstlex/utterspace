import { CREATE_BOOKING, BOOKING_REQUEST, BOOKING_FAILURE } from '../actions/types';

const initialState = {
  bookings: [],
  bookingRequest: false
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BOOKING: 
      return {
        bookings: state.bookings.concat(payload.bookings),
        bookingRequest: false,
      };
    case BOOKING_REQUEST:
      return {
        ...state,
        bookingRequest: true
      }
    case BOOKING_FAILURE:
      return {
        ...state,
        bookingRequest: false
      }
    default:
      return state;
  }
}

export default spaceReducer;
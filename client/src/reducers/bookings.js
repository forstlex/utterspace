import { CREATE_BOOKING, BOOKING_REQUEST, BOOKING_FAILURE, MY_ORDERS } from '../actions/types';

const initialState = {
  bookings: [],
  myOrders: [],
  bookingRequest: false
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BOOKING:
      return {
        bookings: state.bookings.concat(payload),
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
    case MY_ORDERS:
      return {
        ...state,
        myOrders: payload
      }

    default:
      return state;
  }
}

export default spaceReducer;
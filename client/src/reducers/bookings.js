import { CREATE_BOOKING, BOOKING_REQUEST, BOOKING_FAILURE, MY_ORDERS, ALL_ORDERS } from '../actions/types';

const initialState = {
  all: [],
  myOrders: [],
  bookingRequest: false
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BOOKING:
      return {
        all: state.all.concat(payload),
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
    case ALL_ORDERS:
      return {
        ...state,
        all: payload
      }
    default:
      return state;
  }
}

export default spaceReducer;
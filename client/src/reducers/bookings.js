import {
  CREATE_BOOKING,
  BOOKING_REQUEST,
  BOOKING_FAILURE,
  MY_ORDERS,
  ALL_ORDERS,
  ACCEPT_BOOKING_REQUEST,
  ACCEPT_BOOKING_SUCCESS,
  ACCEPT_BOOKING_FAIL,
  REJECT_BOOKING_REQUEST,
  REJECT_BOOKING_SUCCESS,
  REJECT_BOOKING_FAIL
} from '../actions/types';

const initialState = {
  all: [],
  myOrders: [],
  bookingRequest: false,
  clickAccept: false,
  clickReject: false,
};

function bookingReducer(state = initialState, action) {
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
    case ACCEPT_BOOKING_REQUEST:
      return {
        ...state,
        clickAccept: true
      }
    case ACCEPT_BOOKING_SUCCESS:
    case ACCEPT_BOOKING_FAIL:
      return {
        ...state,
        clickAccept: false
      }
    case REJECT_BOOKING_REQUEST:
      return {
        ...state,
        clickReject: true
      }
    case REJECT_BOOKING_SUCCESS:
    case REJECT_BOOKING_FAIL:
      return {
        ...state,
        clickReject: false
      }
    default:
      return state;
  }
}

export default bookingReducer;
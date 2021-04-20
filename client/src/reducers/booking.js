import { CREATE_BOOKING } from '../actions/types';

const initialState = [];

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BOOKING: 
      return state.concat(payload.bookings);
    
    default:
      return state;
  }
}

export default spaceReducer;
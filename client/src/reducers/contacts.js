import { SEND_CONTACT_REQUEST, ALL_CONTACT_REQUESTS } from '../actions/types';

const initialState = [];

function contactReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_CONTACT_REQUEST: {
      return state.concat(payload.contact);
    }

    case ALL_CONTACT_REQUESTS: {
      return payload.all
    }

    default:
      return state;
  }
}

export default contactReducer;

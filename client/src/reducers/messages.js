import { SEND_MESSAGE, LOAD_USER_MESSAES } from '../actions/types';

const initialState = [];

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_MESSAGE:
      return [...state, payload.message];

    case LOAD_USER_MESSAES: 
      return state.concat(payload.messages);

    default:
      return state;
  }
}

export default messageReducer;
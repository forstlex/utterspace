import { SEND_MESSAGE, LOAD_USER_MESSAES, ADD_UNREAD_MESSAGE } from '../actions/types';

const initialState = [];

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_UNREAD_MESSAGE:
    case SEND_MESSAGE: {
      return state.concat(payload.message);
    }

    case LOAD_USER_MESSAES:
      return state.concat(payload.messages);

    default:
      return state;
  }
}

export default messageReducer;
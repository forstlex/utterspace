import { SEND_MESSAGE, LOAD_USER_MESSAES, ADD_UNREAD_MESSAGE, READ_MESSAGE, RECEIVE_NEW_MESSAGE } from '../actions/types';

const initialState = {
  all: [],
  unReads: []
};

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_UNREAD_MESSAGE: {
      const { message } = payload;
      if (state.unReads.length === 0) {
        return { all: state.all.concat(message), unReads: [{ uId: message.sender_id, count: 1 }] }
      } else {
        let existUnRead = state.unReads.find(uR => uR.uId === message.sender_id);
        if (existUnRead) {
          existUnRead = { uId: message.sender_id, count: existUnRead.count + 1 };
          const updatedUnReads = state.unReads.map(u => {
            if (u.uId !== existUnRead.uId)
              return u
            return existUnRead
          });
          return { all: state.all.concat(message), unReads: updatedUnReads }
        }

        return { all: state.all.concat(message), unReads: state.unReads.concat({ uId: message.sender_id, count: 1 }) }
      }
    }
    case READ_MESSAGE: {
      const { uId } = payload;
      return { ...state, unReads: state.unReads.filter(u => u.uId !== uId) };
    }
    case RECEIVE_NEW_MESSAGE: {
      return { ...state, all: state.all.concat(payload.message) };
    }
    case SEND_MESSAGE: {
      return { ...state, all: state.all.concat(payload.message) };
    }

    case LOAD_USER_MESSAES:{
      return { ...state, all: state.all.concat(payload.messages) };
    }
    default:
      return state;
  }
}

export default messageReducer;
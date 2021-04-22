import {
  ADD_SPACE,
  DELETE_SPACE,
  LOAD_USERSPACES,
  REMOVE_BOOKING_SPACE,
  LOAD_GUESTSPACES
} from '../actions/types';

const initialState = {
  allSpaces: [],
  userSpaces: [],
  buySpaces: [],
  loadingSpace: false,
  loadingGuestSpaces: false
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USERSPACES:
      return {
        allSpaces: payload.allSpaces,
        userSpaces: payload.userSpaces,
        buySpaces: payload.buySpaces,
        loadingSpace: true
      }
    
    case LOAD_GUESTSPACES:
      return {
        ...state,
        loadingGuestSpaces: true,
        allSpaces: payload.allSpaces
      }

    case ADD_SPACE: 
      return {
        ...state,
        allSpaces: state.allSpaces.concat(payload),
        userSpaces: state.userSpaces.concat(payload)
      };
    
    case DELETE_SPACE:
      return {
        ...state,
        allSpaces: state.allSpaces.filter(s => s._id !== payload),
        userSpaces: state.userSpaces.filter(s => s._id !== payload)
      }
    
    case REMOVE_BOOKING_SPACE:
      return {
        ...state,
        allSpaces: state.allSpaces.filter(s => s._id !== payload),
        buySpaces: state.buySpaces.filter(s => s._id !== payload)
      }
    default:
      return state;
  }
}

export default spaceReducer;

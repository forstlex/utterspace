import {
  ADD_SPACE,
  DELETE_SPACE,
  LOAD_USER_SPACES,
  REMOVE_BOOKING_SPACE,
  LOAD_GUEST_SPACES,
  LOAD_NEAR_SPACES
} from '../actions/types';

const initialState = {
  allSpaces: [],
  userSpaces: [],
  buySpaces: [],
  nearSpaces: [],
  loadingSpace: false,
  loadingGuestSpaces: false,
  loadNearSpaces: false
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_SPACES:
      return {
        ...state,
        allSpaces: payload.allSpaces,
        userSpaces: payload.userSpaces,
        buySpaces: payload.buySpaces,
        loadingSpace: true
      }

    case LOAD_GUEST_SPACES:
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
    case LOAD_NEAR_SPACES:
      return {
        ...state,
        loadNearSpaces: true,
        nearSpaces: payload.nearSpaces
      }
    default:
      return state;
  }
}

export default spaceReducer;

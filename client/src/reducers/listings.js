import {
  ADD_SPACE,
  LOAD_USERSPACES
} from '../actions/types';

const initialState = {
  allSpaces: [],
  userSpaces: [],
  loadingSpace: false
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USERSPACES: {
      return {
        allSpaces: payload.allSpaces,
        userSpaces: payload.userSpaces,
        loadingSpace: true
      }
    }
    case ADD_SPACE: {
      return {
        allSpaces: state.allSpaces.concat(payload),
        userSpaces: state.userSpaces.concat(payload)
      };
    }
      
    default:
      return initialState;
  }
}

export default spaceReducer;

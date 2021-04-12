import {
  ADD_SPACE,
  LOAD_USERSPACES
} from '../actions/types';

const initialState = {
  allSpaces: [],
  userSpaces: []
};

function spaceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USERSPACES: {
      return {
        allSpaces: payload.allSpaces,
        userSpaces: payload.userSpaces
      }
    }
    case ADD_SPACE:
      return {
        allSpaces: state.allSpaces.concat(payload.space),
        userSpaces: state.userSpaces.concat(payload.space)
      };
    default:
      return initialState;
  }
}

export default spaceReducer;

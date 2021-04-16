import {
  ADD_SPACE,
  DELETE_SPACE,
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
    case LOAD_USERSPACES: 
      return {
        allSpaces: payload.allSpaces,
        userSpaces: payload.userSpaces,
        loadingSpace: true
      }

    case ADD_SPACE: 
      return {
        allSpaces: state.allSpaces.concat(payload),
        userSpaces: state.userSpaces.concat(payload)
      };
    
    case DELETE_SPACE:
      return {
        allSpaces: state.allSpaces.filter(s => s._id !== payload),
        userSpaces: state.userSpaces.filter(s => s._id !== payload)
      }

    default:
      return initialState;
  }
}

export default spaceReducer;

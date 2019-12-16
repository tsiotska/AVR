import {initialState} from './state';
import {types} from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_AUTHORIZATION:
      return {
        ...state,
        authToken: action.auth
      };
    default:
      return state;
  }
};

export default reducer;

// modules
import { Reducer } from 'redux';

// custom
import initalState from './state';
import { action } from 'store';
import { PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE } from './constants';

type reducer = Reducer<initalState, action>;

const reducer: reducer = (state = initalState, action) => {
  switch(action.type) {
    case PERSON_REQUEST: {
      return { ...state, loading: true }
    }

    case PERSON_SUCCESS: {
      return { ...state, loading: false, data: action.payload}
    }

    case PERSON_FAILURE: {
      return { ...state, loading: false, error: action.payload }
    }
  }

  return state;
}

export default reducer;
// modules
import { Reducer } from 'redux';

// custom
import initalState from './state';
import { action } from 'store';
import { PERSONS_SUCCESS, PERSONS_FAILURE } from './constants';

type reducer = Reducer<initalState, action>;

const reducer: reducer = (state = initalState, action) => {
  switch(action.type) {
    case PERSONS_SUCCESS: {
      return { ...state, persons: action.payload }
    }
    case PERSONS_FAILURE: {
      return { ...state, error: action.payload }
    }
  }

  return state;
}

export default reducer;
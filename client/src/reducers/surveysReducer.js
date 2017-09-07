import { FETCH_SURVEYS } from '../actions/types';

// state for surveys is always a list of surveys = array default
export default function(state = [], action){
  switch(action.type){
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}

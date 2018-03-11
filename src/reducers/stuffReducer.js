import initialState from './initialState';
import {
  FETCH_STUFF,
  RECEIVE_STUFF,
  UPDATE_UI,
  UPDATE_UI_MODAL
} from '../actions/actionTypes';

import {
  UPDATE_SIDENAV_STATE
} from '../actions/innerActions/actionTypes';

export default function stuff(state = initialState, action) {
  let newState;
  switch (action.type) {
    case FETCH_STUFF:
      return action;
    case RECEIVE_STUFF:
      newState = {...state, data: action.stuff}
      return newState;
    case UPDATE_UI:
      newState = {...state, ui: action.stuff};
      return newState;
    case UPDATE_UI_MODAL:
      newState = {...state, ui: {...state.ui, isModalOpen: action.stuff}};
      return newState;
    case UPDATE_SIDENAV_STATE:
      // newState = {...state, ui: {...state.ui, isSidenavOpen: action.ui}};
      newState = {...state.ui, isSidenavOpen: action.ui};
      state = {...state, ui: newState}
      return state;
    default:
      return state;
  }
}

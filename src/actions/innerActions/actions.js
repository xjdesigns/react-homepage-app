import * as types from './actionTypes'

export function updateUISidnavState(toggle) {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_SIDENAV_STATE,
      ui: !toggle
    })
  }
}

import * as types from './actionTypes'

export function receiveStuff(arr) {
  return { type: types.RECEIVE_STUFF, stuff: arr }
}

export function fetchStuff() {
  return dispatch => {
    let arr =  [{
      id: 1234,
      name: 'hello'
    }, {
      id: 5678,
      name: 'world'
    }]
    dispatch(receiveStuff(arr))
  }
}

export function updateUIState() {
  return dispatch => {
    let uiState = {
      isAuth: true,
      isModalOpen: false,
      isSidenavOpen: false
    }
    dispatch({
      type: types.UPDATE_UI,
      stuff: uiState
    });
  }
}

export function updateUIModalState() {
  return (dispatch, getState) => {
    // console.warn('getState', getState());
    let uiModalState = true
    dispatch({
      type: types.UPDATE_UI_MODAL,
      stuff: uiModalState
    });
  }
}

// export function updateUISidnavState(toggle) {
//   return (dispatch) => {
//     dispatch({
//       type: types.UPDATE_SIDENAV_STATE,
//       ui: !toggle
//     })
//   }
// }

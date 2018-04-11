import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchData } from './saga-api'

export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga)
}

export function* workerSaga() {
  try {

    const data = yield call(fetchData)
    yield put({ type: "API_CALL_SUCCESS", data })

  } catch(error) {

    console.log('workerSaga:: ERROR');
    yield put({ type: 'API_CALL_FAILURE', error })

  }
}

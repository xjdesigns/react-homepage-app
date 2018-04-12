import { call, put, takeLatest } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { fetchData } from './saga-api'
import { watcherSaga, workerSaga } from './sagas'

jest.mock('./saga-api', () => ({
  fetchData: jest.fn().mockReturnValue('hello world')
}))

let watchGen
let workerGen
describe('sagas::', () => {
  beforeEach(() => {
    watchGen = watcherSaga()
    workerGen = workerSaga()
  })

  it('should call watcherSaga, then next() should be done', () => {
    expect(watchGen.next({ data: 'hello world'}).value).toEqual(takeLatest('API_CALL_REQUEST', workerSaga))
    expect(watchGen.next().done).toBe(true)
  })

  it('should call workerSaga, and test the TRY:: put', () => {
    let fd = 'Hello World';
    workerGen.next()
    expect(workerGen.next(fd).value).toEqual(put({ type: 'API_CALL_SUCCESS', data: 'Hello World'}))
  })

  it('should call workerSaga, and test the CATCH:: put', () => {
    let error = { message: 'I AM AN ERROR' };
    workerGen.next()
    expect(workerGen.throw(error).value).toEqual(put({ type: 'API_CALL_FAILURE', error }))
  })
})

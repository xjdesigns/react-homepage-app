import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import logger  from 'redux-logger'

import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from '../sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default(), sagaMiddleware, logger] :
  [sagaMiddleware];

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
  )
}

// run the saga middleware
export function runSaga() {
  sagaMiddleware.run(watcherSaga)
}

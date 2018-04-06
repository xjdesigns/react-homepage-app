import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import logger  from 'redux-logger'
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const middleware = process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default(), thunk, logger] :
  [thunk];

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(thunk, reduxImmutableStateInvariant(), logger)
    applyMiddleware(...middleware)
  )
}

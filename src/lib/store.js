import { applyMiddleware, compose } from 'redux'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import { createStoreWithFirebase } from 'lib/firebase'
import { getFirebase } from 'react-redux-firebase'


const initialState = {}
const enhancers = []
const middleware = [thunk.withExtraArgument(getFirebase)] // add middlewares

// This is boilerplate code from the redux devtools extension
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store

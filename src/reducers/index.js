import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

// Reducers
const appReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state
  return appReducer(newState, action)
}

export default rootReducer

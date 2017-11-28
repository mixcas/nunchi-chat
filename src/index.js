//eslint-disable import/first
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { firebaseApp } from './firebase'

import { logUser, logOutUser } from './actions'
import reducer from './reducers'

import App from './components/App.jsx'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Bind firebase auth
firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {
    console.log('User logged')

    const { email } = user;
    store.dispatch(logUser(email))
  } else {
    console.log('No user')
    store.dispatch(logOutUser())
  }
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)

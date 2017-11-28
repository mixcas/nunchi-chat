import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Chat  from './Chat'
import Signup  from './Signup'

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={Chat} />
        <Route path='/signup' component={Signup} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  let { user } = state
  return {
    user
  }
}

export default connect(mapStateToProps,null)(App)

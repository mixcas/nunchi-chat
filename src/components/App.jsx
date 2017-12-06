import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Chat  from './Chat'

class App extends Component {

  render() {
    return (
      <Chat />
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

export default withRouter(connect(mapStateToProps, null)(App))

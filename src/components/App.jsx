import React, { Component } from 'react'
import { injectGlobal } from 'styled-components';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Chat  from './Chat'

injectGlobal`
  @font-face {
    font-family: 'SaniTrixieSansRegular';
    src: url('/fonts/SaniTrixieSans.ttf');
  }

  body {
    font-family: 'SaniTrixieSansRegular';
    margin: 0;
  }
`;

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

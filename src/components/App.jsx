import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Chat  from './Chat'

const AppWrapper = styled.div`
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
      <AppWrapper>
        <Chat />
      </AppWrapper>
    )
  }
}

function mapStateToProps(state) {
  let { user } = state

  return {
    user
  }
}

export default connect(mapStateToProps, null)(App)

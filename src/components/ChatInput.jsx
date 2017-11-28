import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login  from './Login'
import MessageInput  from './MessageInput'

class ChatInput extends Component {

  render() {
    if(this.props.user.email) {
      return (
        <MessageInput user={this.props.user}/>
      )
    } else {
      return(
        <Login />
      )
    }
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  }
}

export default connect(mapStateToProps, null)(ChatInput)

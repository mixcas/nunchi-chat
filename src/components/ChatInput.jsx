import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MessageInput  from './MessageInput'
import Signup  from './Signup'
import Login  from './Login'

class ChatInput extends Component {

  render() {
    if(this.props.user.email) {
      return (
        <MessageInput user={this.props.user}/>
      )
    } else {
      return(
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
        </div>
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

export default withRouter(connect(mapStateToProps, null)(ChatInput))

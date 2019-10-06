import React, { Component } from 'react'
import { connect } from 'react-redux'

import MessageInput  from './MessageInput'
import UserAuthForm  from './UserAuthForm'

const ChatInput = ({user}) => {
  if(user.email) {
    return (
      <MessageInput user={user}/>
    )
  } else {
    return(
      <UserAuthForm/>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state

  return {
    user,
  }
}

export default connect(mapStateToProps, null)(ChatInput)

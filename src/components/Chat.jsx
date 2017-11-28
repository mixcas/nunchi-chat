import React, { Component } from 'react'
import { connect } from 'react-redux'

import ChatInput  from './ChatInput'
import MessagesList  from './MessagesList'

class Chat extends Component {
  render() {
    return (
      <div>
        <MessagesList />
        <ChatInput />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {}
}

export default connect(mapStateToProps,null)(Chat)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import MessageInput  from './MessageInput'
import MessagesList  from './MessagesList'

class Chat extends Component {
  render() {
    return (
      <div>
        <MessagesList />
        <MessageInput />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {}
}

export default connect(mapStateToProps,null)(Chat)

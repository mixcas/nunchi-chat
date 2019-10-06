import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ChatInput  from './ChatInput'
import MessagesList  from './MessagesList'
import Youtube  from './Youtube'

const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const MessagesListWrapper = styled.div`
  flex: 1 0 30%;
`

class Chat extends Component {
  render() {
    return (
      <ChatContainer>
        <Youtube/>
        <MessagesListWrapper>
          <MessagesList />
          <ChatInput />
        </MessagesListWrapper>
      </ChatContainer>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {}
}

export default withRouter(
  connect(mapStateToProps,null)(Chat)
)

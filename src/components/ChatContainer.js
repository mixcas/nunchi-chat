import React, { Component } from 'react'

import MessagesListContainer from 'containers/MessagesListContainer'
import ChatControls from 'components/ChatControls'

class ChatContainer extends Component {
	render() {
    return (
      <div className='chat-container'>
        <MessagesListContainer />
        <ChatControls/>
      </div>
    )
	}
}

export default ChatContainer

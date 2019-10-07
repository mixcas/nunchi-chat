import React, { Component } from 'react'

import Header from 'components/Header'
import ChatContainer from 'components/ChatContainer'
import PlaylistContainer from 'containers/PlaylistContainer'

class Chat extends Component {
	render() {
		return (
      <div>
        <Header />
        <div className='main-container'>
          <PlaylistContainer/>
          <ChatContainer/>
        </div>
      </div>
		)
	}
}

export default Chat

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMessages } from '../actions'

import { messageRef } from '../firebase'

import AnimatedFrames from './AnimatedFrames'


class MessagesList extends Component {
  componentDidMount() {
    messageRef.on('value', snapshot => {
      let messages = []

      snapshot.forEach(message => {
        messages.push(message.val())
      })

      this.props.setMessages(messages)
    })
  }

  render() {
    let { messages } = this.props

    messages = messages.slice(messages.length - 4, messages.length )

    return (
      <div>
        {
          messages.map((message,index) => {
            return (
              <div key={index}>
                <AnimatedFrames image={message.image} />
                <p>{message.message}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { messages } = state
  return  {
    messages,
  }
}

export default connect(mapStateToProps,{ setMessages })(MessagesList)

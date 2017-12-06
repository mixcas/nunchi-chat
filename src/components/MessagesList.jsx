import React, { Component } from 'react'
import styled from 'styled-components';

import { connect } from 'react-redux'
import { setMessages } from '../actions'

import { messageRef } from '../firebase'

import AnimatedFrames from './AnimatedFrames'

const Message = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
  width: 50vw;
  margin-bottom: 5px;
`

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
              <Message key={index}>
                <AnimatedFrames image={message.image} />
                <p>{message.message}</p>
              </Message>
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

import React from 'react'

import AnimatedFrames from 'components/AnimatedFrames'

const MessagesList = ({messages}) => {
  return (
    <div>
      {
        messages.map((message,index) => {
          return (
            <div key={message.key}>
              <AnimatedFrames image={message.value.image} />
              <p>{message.value.message}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default MessagesList

import React, { Component } from 'react'
import Webcam from 'react-webcam'
import mergeImages from 'merge-images'
import { firebaseApp, messageRef } from '../firebase'

import { WIDTH } from '../constants'

class MessageInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      disabled: false,
    }

    this.time = 1500
    this.frames = 5

  }

  componentDidMount() {
    this.input.focus()
  }

  signOut() {
    firebaseApp.auth().signOut()
  }

  submitMessage() {
    this.setState({ disabled: true })
    this.input.value = ''
    this.getFrames()
  }

  sendMessage(image) {
    const { message } = this.state
    const { email } = this.props.user
    messageRef.push({ email, message, image })
    this.setState({ disabled: false })
  }

  getImage() {
    const frames = this.getFrames()

    const image = this.joinFrames(frames)

    return image
  }

  getFrames() {

    let frames = []

    for(let x = 0; x < this.frames; x++) {
      if (x === 0) {
        frames[x] = {
          src: this.webcam.getScreenshot(),
          x: WIDTH * x,
          y: 0,
        }
      } else {
        setTimeout(() => {
          frames[x] = {
            src: this.webcam.getScreenshot(),
            x: WIDTH * x,
            y: 0,
          }

          if(frames.length === this.frames) {
            mergeImages(frames, {
              width: WIDTH * this.frames,
              height: WIDTH * .75
            }).then(image => {
              this.sendMessage(image)
            })
          }

        }, this.time/5 * x)
      }

    }

  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <Webcam
          audio={false}
          width={WIDTH}
          height={'auto'}
          screenshotFormat='image/jpeg'
          ref={ref => this.webcam = ref}
        />
        <input
          ref={ ref => this.input = ref}
          type='text'
          disabled={this.state.disabled}
          placeholder='tu mensaje'
          onChange={event => this.setState({ message: event.target.value })}
        />
        <button
          onClick={() => this.submitMessage()}
          type='submit'>
          Enviar
        </button>
        <a onClick={() => this.signOut()}>Sign Out</a>
      </form>
    )
  }
}

export default MessageInput

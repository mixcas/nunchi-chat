import React, { Component } from 'react'
import Webcam from 'react-webcam'
import mergeImages from 'merge-images'
import { withFirebase } from 'react-redux-firebase'

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
    debugger
    // this.input.focus()
  }

  submitMessage() {
    this.setState({ disabled: true })
    this.getFrames()
  }

  sendMessage(image) {
    const { firebase } = this.props
    const { message } = this.state
    const { email } = this.props.user

    firebase.push('messages', { email, message, image })
      .then( res => {
        this.setState({ disabled: false, message: '' })
      })
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
          type='text'
          disabled={this.state.disabled}
          placeholder='tu mensaje'
          onChange={event => this.setState({ message: event.target.value })}
          value={this.state.message}
        />
        <button
          onClick={() => this.submitMessage()}
          type='submit'>
          Enviar
        </button>
      </form>
    )
  }
}

export default withFirebase(MessageInput)

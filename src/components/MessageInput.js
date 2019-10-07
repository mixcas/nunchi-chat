import React, { Component } from 'react'
import { compose } from 'redux'
import Webcam from 'react-webcam'
import mergeImages from 'merge-images'
import { withFirebase, withFirestore } from 'react-redux-firebase'

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
        this.parseMessage(message)
        this.setState({ disabled: false, message: '' })
      })
  }

  parseMessage(message) {
    const { firestore } = this.props

    const urlRegex = /\bhttps?:\/\/\S+/gi
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/

    const matches = message.match(urlRegex).filter(link => link.match(youtubeRegex))

    const video = matches[0]


    firestore.set({
      collection: 'playlist',
      doc: this.extractVideoIdFromYoutubeLink(video)
    }, {
      url: video,
      createdDate: + new Date(),
      status: 'pending',
    })

  }

  extractVideoIdFromYoutubeLink(youtubeLink) {
    return youtubeLink.split( 'v=' )[1].split( '&' )[0]
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
          ref={ref => this.input = ref}
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

export default compose(
  withFirebase,
  withFirestore,
)(MessageInput)

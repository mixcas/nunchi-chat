import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseApp, messageRef } from '../firebase'

import Login  from './Login'

class MessageInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: '',
    }
  }

  signOut() {
    firebaseApp.auth().signOut()
  }

  addMessage() {
    const { message } = this.state
    const { email } = this.props.user
    messageRef.push({ email, message });
    this.input.value = ''
  }

  render() {
    if(this.props.user.email) {
      return (
        <div>
          <input
            ref={ ref => this.input = ref}
            type='text'
            placeholder='tu mensaje'
            onChange={event => this.setState({ message: event.target.value })}
          />
          <button
            onClick={() => this.addMessage()}
            type='button'>
            Enviar
          </button>
          <button onClick={() => this.signOut()}>Sign Out</button>
        </div>
      )
    } else {
      return(
        <Login />
      )
    }
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  }
}

export default connect(mapStateToProps, null)(MessageInput)

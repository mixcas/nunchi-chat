import React, { Component } from 'react'
import { firebaseApp, usersRef } from '../firebase'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      error: {
        message: '',
      },
    }
  }

  signup() {
    const { email, username, password } = this.state

    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      if(error) {
        this.setState({error});
        console.log(error)
      }
    }).then(user => {
      if(user) {
        usersRef.child(user.uid).set({username}).catch(error => {
          this.setState({error});
          console.log(error)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Registrate</h2>
        <input
          ref={ ref => this.email = ref}
          type='text'
          placeholder='Email'
          onChange={event => this.setState({ email: event.target.value })}
        />
        <input
          ref={ ref => this.username = ref}
          type='text'
          placeholder='Username'
          onChange={event => this.setState({ username: event.target.value })}
        />
        <input
          ref={ ref => this.password = ref}
          type='password'
          placeholder='Password'
          onChange={event => this.setState({ password: event.target.value })}
        />
        <button
          onClick={() => this.signup()}
          type='button'>
          Enviar
        </button>
        <p>{this.state.error.message}</p>
      </div>
    )
  }
}

export default Signup

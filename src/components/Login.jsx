import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
    }
  }

  login() {
    const { email, password } = this.state
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          ref={ ref => this.email = ref}
          type='text'
          placeholder='Email'
          onChange={event => this.setState({ email: event.target.value })}
        />
        <input
          ref={ ref => this.password = ref}
          type='password'
          placeholder='Password'
          onChange={event => this.setState({ password: event.target.value })}
        />
        <button
          onClick={() => this.login()}
          type='button'>
          Enviar
        </button>
        <Link to='/signup'>Registro</Link>
      </div>
    )
  }
}

export default Login

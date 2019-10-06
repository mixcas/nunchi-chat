import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'

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

  componentDidMount() {
    this.email.focus()
  }

  signup() {
    const  { firebase } = this.props
    const { email, username, password } = this.state

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          username,
        })
      })
      .catch(error => {
        if(error) {
          this.setState({error});
          console.log(error)
        }
      })
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
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
          type='submit'>
          Registrarse
        </button>
        <p>{this.state.error.message}</p>
      </form>
    )
  }
}

export default withFirebase(Signup)

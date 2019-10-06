import React, { Component } from 'react'

import Signup  from './Signup'
import Login  from './Login'

class UserAuthForm extends Component {
  state = {
    login: true,
    signup: false,
  }

  render() {
    const  { login, signup } = this.state

    if (login) {
      return (
        <div>
          <Login/>
          <button onClick={() => this.setState({
            login: false,
          })}>
          Registrarse
        </button>
      </div>
      )
    } else  {
      return (
        <div>
          <Signup/>
          <button onClick={() => this.setState({
            login: true,
          })}>
          Iniciar Sesión
        </button>
        </div>
      )
    }
  }
}

export default UserAuthForm

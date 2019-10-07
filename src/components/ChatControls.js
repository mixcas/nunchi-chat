import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import Signup  from 'components/Signup'
import Login  from 'components/Login'
import MessageInput  from 'components/MessageInput'

class ChatControls extends Component {
  state = {
    login: true,
  }

  switchLogin = () => {
    this.setState( currentState => {
      return {
        login: !currentState.login,
      }
    })
  }

  render() {
    const { user } = this.props
    const { login } = this.state

    if (!isLoaded(user)) {
      return null
    } else if (isEmpty(user)) {
      if (login) {
        return (
          <>
            <Login/>
            <button onClick={this.switchLogin}>Registrarse</button>
          </>
        )
      } else {
        return (
          <>
            <Signup/>
            <button onClick={this.switchLogin}>Iniciar Sesión</button>
          </>
        )
      }
    } else {
      return (
        <MessageInput user={user}/>
      )
    }
  }
}

ChatControls.propTypes = {
}

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth
  }
}

export default connect(mapStateToProps)(ChatControls)

import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'

const Header = ({ user, firebase }) => {

  const handleSignOut = () => {
    if (window.confirm('Segurx que deseas salir?') ) {
      firebase.auth().signOut()
    }
  }
  return (
    <div className='header'>
      <div>
        <h1>Nunchi Chat</h1>
      </div>

      {isLoaded(user) && !isEmpty(user) ? (
        <div>
          <button onClick={handleSignOut}>Salir</button>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth
  }
}

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Header)

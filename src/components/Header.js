import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase'

const Header = ({ user }) => {
  return (
    <div className='header'>
      <div>
        <h1>Nunchi Chat</h1>
      </div>

      {isLoaded(user) && !isEmpty(user) ? (
        <div>
          <button>Salir</button>
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

export default connect(mapStateToProps)(Header)

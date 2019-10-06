import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase'
import MessagesList from 'components/MessagesList'

const MessagesListContainer = ({ messages }) => {
  if (!isLoaded(messages)) {
    return <p>Loading</p>
  } else if (isEmpty(messages)) {
    return <p>Empty</p>
  } else {
    return <MessagesList className='message-list' messages={messages}/>
  }
}

MessagesListContainer.propTypes = {
	messages: PropTypes.array,
}

const mapStateToProps = (state, props) => {
	return {
		messages: state.firebase.ordered.messages,
	}
}

export default compose(
	firebaseConnect([{
		path: 'messages',
		queryParams: ['orderByKey', 'limitToLast=3'],
	}]),
	connect(mapStateToProps)
)(MessagesListContainer)

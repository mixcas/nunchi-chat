import { combineReducers } from 'redux'
import user from './reducer_user.js'
import messages from './reducer_messages.js'

export default combineReducers({
  user,
  messages,
})

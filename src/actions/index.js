import { SIGNED_IN, SIGNED_OUT, SET_MESSAGES } from '../constants'

export function logUser(email, username) {
  const action = {
    type: SIGNED_IN,
    email,
  }

  return action
}

export function logOutUser() {
  const action = {
    type: SIGNED_OUT,
  }

  return action
}

export function setMessages(messages) {
  const action = {
    type: SET_MESSAGES,
    messages,
  }

  return action
}

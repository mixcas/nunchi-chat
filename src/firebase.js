import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC8L6IQ7viPvmXrpGb3hmtXR2o8sMYPhVg",
  authDomain: "nunchi-chat.firebaseapp.com",
  databaseURL: "https://nunchi-chat.firebaseio.com",
  projectId: "nunchi-chat",
  storageBucket: "nunchi-chat.appspot.com",
  messagingSenderId: "277495060856"
}

export const firebaseApp = firebase.initializeApp(config)
export const usersRef = firebase.database().ref('users')
export const messageRef = firebase.database().ref('messages')

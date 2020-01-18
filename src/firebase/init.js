import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBtdCgur7_9ShErT8-nfoeS8eIKPJNX2bY',
  authDomain: 'kirch-chat.firebaseapp.com',
  databaseURL: 'https://kirch-chat.firebaseio.com',
  projectId: 'kirch-chat',
  storageBucket: 'kirch-chat.appspot.com',
  messagingSenderId: '84092809830',
  appId: '1:84092809830:web:661235b34a68977f9df3a7'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()

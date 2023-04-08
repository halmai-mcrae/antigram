import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'antigram-7c7ef.firebaseapp.com',
  projectId: 'antigram-7c7ef',
  storageBucket: 'antigram-7c7ef.appspot.com',
  messagingSenderId: '773928047669',
  appId:
    '1:773928047669:web:2f86696e1bd5be72b04d7c',
  measurementId: 'G-ZSMCWGKYQ9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }

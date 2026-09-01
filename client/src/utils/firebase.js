
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sundayai-646db.firebaseapp.com",
  projectId: "sundayai-646db",
  storageBucket: "sundayai-646db.firebasestorage.app",
  messagingSenderId: "111733392445",
  appId: "1:111733392445:web:2be9804f2dc2dadef65654"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9IP88XIcVs0PP5eMncCUwCSF0OP5LUME",
  authDomain: "anato-learn.firebaseapp.com",
  projectId: "anato-learn",
  storageBucket: "anato-learn.firebasestorage.app",
  messagingSenderId: "656674150383",
  appId: "1:656674150383:web:5acb9fce9512136fc9881a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
};
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpO5gWF9SeFXgaU4aUIKvcRcVYuzFTUTs",
  authDomain: "whatsapp-clone-4bd02.firebaseapp.com",
  projectId: "whatsapp-clone-4bd02",
  storageBucket: "whatsapp-clone-4bd02.appspot.com",
  messagingSenderId: "32288268077",
  appId: "1:32288268077:web:8388e24ea589fe603a3da4"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider}
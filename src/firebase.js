// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs1iIUT2q8a2iL3NcPEP5PU03HOd1kHmY",
  authDomain: "dev-cluster-student-project.firebaseapp.com",
  projectId: "dev-cluster-student-project",
  storageBucket: "dev-cluster-student-project.appspot.com",
  messagingSenderId: "548940980597",
  appId: "1:548940980597:web:f8e48ac3378657abadb33c",
  measurementId: "G-M6T6HEP4YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firebase Firestore
const db = getFirestore(app);

export { auth, googleProvider, db };

import React from "react";
// Firebase app is always required and must be first
import firebase from "firebase";
// Add additional services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// import 'firebase/firestore'
// import 'firebase/messaging'
// import 'firebase/functions'

// Flamelink app is always required
import flamelink from "flamelink/app";
// Add additional modules that you want to use
import "flamelink/content";
import "flamelink/storage";
// import 'flamelink/settings'
// import 'flamelink/navigation'
// import 'flamelink/users'

const firebaseConfig = {
  apiKey: "AIzaSyDrQEupm_MrUm1eXRHVL6SJ6fHyS89Yxak",
  authDomain: "fir-32d38.firebaseapp.com",
  databaseURL: "https://fir-32d38.firebaseio.com",
  projectId: "fir-32d38",
  storageBucket: "fir-32d38.appspot.com",
  messagingSenderId: "785847414044",
  appId: "1:785847414044:web:1a7589d76c9ae57f969ed9",
  measurementId: "G-XVZXW5QXM6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = flamelink({
  firebaseApp,
  env: "production", // optional, defaults to `production`
  locale: "en-US", // optional, defaults to `en-US`
  dbType: "cf" // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
});

export default app;

import React, { useEffect } from "react";
import firebase from "firebase";

// Your web app's Firebase configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

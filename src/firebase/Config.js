import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMbSFTfbtqUYViuugXaIAOJ1ezrR5kdNk",
  authDomain: "mymoney-e4fe6.firebaseapp.com",
  projectId: "mymoney-e4fe6",
  storageBucket: "mymoney-e4fe6.appspot.com",
  messagingSenderId: "243574207381",
  appId: "1:243574207381:web:2db9812331c29c78bebc9c",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };

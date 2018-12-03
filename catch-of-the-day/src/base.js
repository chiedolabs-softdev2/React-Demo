import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "catch-of-the-day-lovo.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-lovo.firebaseio.com",
  projectId: "catch-of-the-day-lovo",
  storageBucket: "catch-of-the-day-lovo.appspot.com",
  messagingSenderId: "556148451366"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;
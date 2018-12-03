import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBFJ_qJfuE0YzDJdvvDi0Zgyf9lZHFF1rg",
  authDomain: "catch-of-the-day-lovo.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-lovo.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;
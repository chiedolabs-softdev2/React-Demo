import Rebase from 're-base';
import firebase from 'firebase';
import {config} from 'dotenv'

config({ path: 'variables.env' });

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "catch-of-the-day-lovo.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-lovo.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;
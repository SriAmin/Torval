import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY96YFnaor3iGCg_sKiqv30ECacELRcZk",
    authDomain: "computercompanion-5f2c0.firebaseapp.com",
    projectId: "computercompanion-5f2c0",
    storageBucket: "computercompanion-5f2c0.appspot.com",
    messagingSenderId: "667253194888",
    appId: "1:667253194888:web:17791f8c310d6260a15f3d",
    measurementId: "G-3KSC0S29Q3"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
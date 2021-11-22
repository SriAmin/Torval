const functions = require("firebase-functions");
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const config = {
    apiKey: "AIzaSyAY96YFnaor3iGCg_sKiqv30ECacELRcZk",
    authDomain: "computercompanion-5f2c0.firebaseapp.com",
    projectId: "computercompanion-5f2c0",
    storageBucket: "computercompanion-5f2c0.appspot.com",
    messagingSenderId: "667253194888",
    appId: "1:667253194888:web:17791f8c310d6260a15f3d",
    measurementId: "G-3KSC0S29Q3"
  };

const firebase = require('firebase');
const { app } = require("firebase-admin");
firebase.initializeApp(config);

const db = admin.firestore();

exports.getThreads = functions.https.onRequest((req, res) => {
    db.collection('threads').get().then(data => {
        let threads = [];
        data.forEach(doc => {
            threads.push(doc.data());
        });
        return res.json(threads);
    })
    .catch(err => console.error(err));
});

exports.createThread = functions.https.onRequest((req, res) => {
    if(req.method !== 'POST'){
        return res.status(400).json({error: "Bad request from client"});
    }
    const newThread = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    db
        .collection('threads')
        .add(newThread)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'server error status 500'});
            console.error(err);
        })
})

//Signup
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email, 
        password: req.body.password,
        confirmPassword: req.body.confirmPassword, 
        handle: req.body.handle,
    };

    db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
        if(doc.exists){
            return res.status(400).json({handle : "this user handle/name is already taken"});
        }else{
            return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.status(201).json({token});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
    });


    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data=> {
            return res.status(201).json({message: `user ${data.user.uid} signed up successfuly`});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });

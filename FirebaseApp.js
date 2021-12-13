import React, {Component, useEffect} from "react"
import {View, Text, Button} from 'react-native'

import firestore from '@react-native-firebase/firestore';

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

//const app = initializeApp(firebaseConfig);

const FirebaseApp = () => {
    
    getThread = async () => {
        const threadDocuments = await firestore().collection("threads")
        console.log(threadDocuments)
    }

    return (
        <View>
            <Button 
                title="Get Firebase Firestore Data"
                onPress={getThread} />
        </View>
    )
}

export default FirebaseApp;

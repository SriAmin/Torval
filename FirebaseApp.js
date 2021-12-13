import React, {Component, useEffect} from "react"
import {View, Text, Button} from 'react-native'

import firestore from '@react-native-firebase/firestore';

const FirebaseApp = () => {
    
    getThread = async () => {
        const threadDocuments = await firestore().collection("threads").doc("EWLQDPg4nSoW0ZrIJ23n").get()
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

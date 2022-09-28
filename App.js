/*
App.js

This file is the main file called when the react native project starts, it essentially 
sets up the Tab Navigator and the navigation system that the application will follow.
Using React Navigation library, we can do perform that requirement.
*/

import React from 'react';
import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import TorvalNavigator from './components/TorvalNavigator';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//This will create the Bottom Tab Navigator using React Navigation
const Stack = createNativeStackNavigator();
export default function App() {
  /*
  App() is the main function application, which contains the Tab Navigator with the required components

  Return:
  NavigationContainer
  */

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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

  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Torval" options={{headerShown: false}} component={TorvalNavigator} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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

//This will create the Bottom Tab Navigator using React Navigation
const Stack = createNativeStackNavigator();
export default function App() {
  /*
  App() is the main function application, which contains the Tab Navigator with the required components

  Return:
  NavigationContainer
  */
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Torval" options={{headerShown: false}} component={TorvalNavigator} />
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

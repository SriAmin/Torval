/*
App.js

This is the main application that contains a Stack Navigator between
Authentication and the Torval Application.
*/

import React from 'react';

import TorvalNavigator from './components/navigators/TorvalNavigator';
import {NavigationContainer} from "@react-navigation/native";
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

//Creates a Stack Navigator from React Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  /*
  App() is used to return the Stack Navigator which contains any
  Authentication screens and the Torval Application

  Return:
  NavigationContainer
  */
  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Torval" options={{headerShown: false}} component={TorvalNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

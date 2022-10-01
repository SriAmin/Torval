import React from 'react';

import TorvalNavigator from './components/TorvalNavigator';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import GlobalStyleSheet from "./screens/GlobalStylesheet"

import { MD3DarkTheme as DarkTheme, Provider as PaperProvider } from 'react-native-paper'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
          <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                      <Stack.Screen name="Torval" options={{headerShown: false}} component={TorvalNavigator} />
                      <Stack.Screen name="SignUp" component={SignUp} />
                      <Stack.Screen name="GlobalStylesheet" component={GlobalStyleSheet} />
                  </Stack.Navigator>
          </NavigationContainer>
  );
};

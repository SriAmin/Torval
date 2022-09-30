import React from 'react';

import TorvalNavigator from './components/TorvalNavigator';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Torval" options={{headerShown: false}} component={TorvalNavigator} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

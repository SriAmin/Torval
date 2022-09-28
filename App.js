import React from 'react';

import AppNavigation from './routes';
import TorvalNavigator from './components/TorvalNavigator';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Torval" options={{headerShown: false}} component={TorvalNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

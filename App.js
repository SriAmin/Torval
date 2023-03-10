import React from "react";

import TorvalNavigator from "./components/navigators/TorvalNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import GlobalStyleSheet from "./screens/GlobalStylesheet";
import * as Font from "expo-font";
import { LogBox } from "react-native";
import { StatusBar } from "react-native";

import {
  MD3DarkTheme as DarkTheme,
  Provider as PaperProvider
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ThreadsScreen from "./screens/SocialForum/ThreadsScreen";

const Stack = createNativeStackNavigator();

async function componentDidMount() {
  StatusBar.setBarStyle("light-content", true);
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font
  });
}

export default function App() {
  componentDidMount();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Torval"
          options={{ headerShown: false }}
          component={TorvalNavigator}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{
            title: "Sign Up",
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: "#002347"
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 32
            }
          }} 
        />
        <Stack.Screen name="GlobalStylesheet" component={GlobalStyleSheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
TorvalNavigator.js

This is the main application that contains most of the functional areas
of the application.
*/

import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import ChatbotScreen from "../../screens/Chatbot/ChatbotScreen";
import SocialForumNavigation from "./SocialForumNavigation";
import TutoriaNavigator from "./TutorialNavgiator";
import ProfileScreen from "../../screens/ProfileScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//This will create a Tab navigator from React Navigation
const Tab = createBottomTabNavigator();

const TorvalNavigator = ({ navigation }) => {
  /*
    TorvalNavigator() is used to return the Tab Navigator which contains TutorialNavigator,
    ChatbotScreen, and SocialForumNavigator

    Return:
    NavigationContainer
    */

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Tutorials") {
            iconName = "cube-outline";
          } else if (route.name === "Chatbot") {
            iconName = "chatbox-ellipses-outline";
          } else if (route.name === "Forum") {
            iconName = "people-circle-outline";
          } else if (route.name === "Profile") {
            iconName = "people-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7b42f5",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}
    >
      <Tab.Screen name="Tutorials" component={TutoriaNavigator} />
      <Tab.Screen name="Forum" component={SocialForumNavigation} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default TorvalNavigator;

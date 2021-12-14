/*
App.js

This file is the main file called when the react native project starts, it essentially 
sets up the Tab Navigator and the navigation system that the application will follow.
Using React Navigation library, we can do perform that requirement.
*/

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChatbotScreen from './screens/Chatbot/ChatbotScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SocialForumNavigation from './components/SocialForumNavigation';
import TutoriaNavigator from './components/TutorialNavgiator';

//This will create the Bottom Tab Navigator using React Navigation
const Tab = createBottomTabNavigator();
export default function App() {
  /*
  App() is the main function application, which contains the Tab Navigator with the required components

  Return:
  NavigationContainer
  */
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tutorials') {
              iconName = 'cube-outline'
            } else if (route.name === 'Chatbot') {
              iconName = 'chatbox-ellipses-outline'
            } else if (route.name === 'Forum') {
              iconName = 'people-circle-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#7b42f5',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Tutorials" component={TutoriaNavigator} />
        <Tab.Screen name="Forum" component={SocialForumNavigation} />
        <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      </Tab.Navigator>
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ARScreen from './screens/ARScreen';
import SocialForumScreen from './screens/SocialForumScreen'
import ChatbotScreen from './screens/ChatbotScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'AR') {
              iconName = 'cube-outline'
            } else if (route.name === 'Chatbot') {
              iconName = 'chatbox-ellipses-outline'
            } else if (route.name === 'Forum') {
              iconName = 'people-circle-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f194ff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="AR" component={ARScreen} />
        <Tab.Screen name="Forum" component={SocialForumScreen} />
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
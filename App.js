import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ARScreen from './screens/ARScreen';
import SocialForumScreen from './screens/SocialForumScreen'
import ChatbotScreen from './screens/ChatbotScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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

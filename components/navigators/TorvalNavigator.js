import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatbotScreen from '../../screens/Chatbot/ChatbotScreen'
import SocialForumNavigation from './SocialForumNavigation';
import TutoriaNavigator from './TutorialNavgiator';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//This will create a Stack navigator within the Forum thread to handle navigation between the screen and its comments
const Tab = createBottomTabNavigator();

const TorvalNavigator = ({navigation}) => {
    //console.log(navigation)
    return (
        <NavigationContainer independent={true}>
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

export default TorvalNavigator;

/*
TutorialNavigator.js

This is one of the main components of the AR Tutorials, its the Stack Navigator from
the React Navigation.
*/

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import TutorialListView from '../../screens/ARTutorials/TutorialListView';
import TutorialView from '../../screens/ARTutorials/TutorialView';
import TutorialDescriptionView from '../../screens/ARTutorials/TutorialDescriptionView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//This will create a Stack navigator within the Forum thread to handle navigation between the screen and its comments
const Stack = createNativeStackNavigator();

const TutorialNavgiator = () => {
  console.log("Hello 1")
  /*
  TutorialNavigator() is used to return the Stack Navigator which contains TutoriaListView,
  TutorialDescriptionView, TutorialView

  Return:
  NavigationContainer
  */
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Tutorial Lists" component={TutorialListView}/>
            <Stack.Screen name="Description" component={TutorialDescriptionView}/>
            <Stack.Screen options={{headerShown: false}} name="Tutorial" component={TutorialView} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 15,
    },
    itemImg: {
        height: 50,
        width: 50,
    },
    itemTitle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    desc: {
        fontSize: 10,
        padding: 10,
    }
  });

export default TutorialNavgiator;

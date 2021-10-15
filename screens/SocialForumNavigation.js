import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import SocialForumScreen from './SocialForumScreen';
import SocialForumComments from './SocialForumComments';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//This will create a Stack navigator within the Forum thread to handle navigation between the screen and its comments
const Stack = createNativeStackNavigator();

const SocialForumNavigation = () => {
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen
              name="Forum Thread"
              component={SocialForumScreen}
            />
            <Stack.Screen name="Comments" component={SocialForumComments} />
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

export default SocialForumNavigation;

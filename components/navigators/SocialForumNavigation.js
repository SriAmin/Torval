import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import SocialForumScreen from '../../screens/SocialForum/SocialForumScreen';
import SocialForumComments from '../../screens/SocialForum/SocialForumComments';
import SocialForumThread from '../../screens/SocialForum/SocialForumThread';
import SocialForumAddComment from '../../screens/SocialForum/SocialForumAddComment';
import TutorialDescriptionView from '../../screens/ARTutorials/TutorialDescriptionView';
import TutorialView from '../../screens/ARTutorials/TutorialView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//This will create a Stack navigator within the Forum thread to handle navigation between the screen and its comments
const Stack = createNativeStackNavigator();

const SocialForumNavigation = ({navigation}) => {
    //console.log(navigation)
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen
              name="Forum Thread"
              component={SocialForumScreen}
            />
            <Stack.Screen name="Comments" component={SocialForumComments} />
            <Stack.Screen name="Create A Thread" component={SocialForumThread} />
            <Stack.Screen name="CreateComment" component={SocialForumAddComment} />
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

export default SocialForumNavigation;

import React from "react";
import { StyleSheet } from "react-native";

import ThreadsScreen from "../../screens/SocialForum/ThreadsScreen";
import ThreadDetailScreen from "../../screens/SocialForum/ThreadDetailScreen";
import SocialForumThread from "../../screens/SocialForum/AddThreadScreen";
import AddCommentScreen from "../../screens/SocialForum/AddCommentScreen";
import SubforumsScreen from "../../screens/SocialForum/SubforumsScreen";
import TutorialDescriptionView from "../../screens/ARTutorials/TutorialDescriptionView";
import TutorialView from "../../screens/ARTutorials/TutorialView";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraComponent from "../CameraComponent";
import { Button } from "native-base";

//This will create a Stack navigator within the Forum thread to handle navigation between the screen and its comments
const Stack = createNativeStackNavigator();

const SocialForumNavigation = ({ navigation }) => {
  //console.log(navigation)
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Subforums"
          component={SubforumsScreen}
          options={{
            title: "Social Forums",
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
        <Stack.Screen
          name="ThreadsScreen"
          component={ThreadsScreen}
          options={{
            title: "Threads",
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
        <Stack.Screen
          name="Comments"
          component={ThreadDetailScreen}
          options={{
            title: "",
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: "#002347"
            },
            headerTintColor: "#fff"
          }}
        />
        <Stack.Screen
          name="Create A Thread"
          component={SocialForumThread}
          options={{
            title: "Create a thread",
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
        <Stack.Screen
          name="Create Comment"
          component={AddCommentScreen}
          options={{
            title: "Create a comment",
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
        <Stack.Screen
          name="Description"
          component={TutorialDescriptionView}
          options={{
            title: "AR tutorial",
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tutorial"
          component={TutorialView}
        />
        <Stack.Screen
          name="CameraComponent"
          component={CameraComponent}
          options={{
            title: "CameraComponent",
            headerShown: false,
            tabBarStyle: { display: "none" }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  itemContainer: {
    padding: 15
  },
  itemImg: {
    height: 50,
    width: 50
  },
  itemTitle: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  desc: {
    fontSize: 10,
    padding: 10
  }
});

export default SocialForumNavigation;

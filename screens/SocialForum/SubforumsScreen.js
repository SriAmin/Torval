import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FAB, Avatar, Card } from "react-native-paper";
import { auth, db, supportEmail, userDocument } from "../../config/firebase";

export default function ThreadsScreen({ navigation }) {
  const initialElements = [
    {
      id: "gpu",
      text: "Graphics Card",
      icon: "expansion-card",
      subtitle: "Display and 3D graphics performance."
    },
    {
      id: "psu",
      text: "Power Supply",
      icon: "power-plug",
      subtitle: "Responsible for power transfer to the computer."
    },
    {
      id: "mobo",
      text: "Motherboard",
      icon: "microchip",
      subtitle: "Where all of the components are connected."
    },
    {
      id: "watercooling",
      text: "Watercooling",
      icon: "water",
      subtitle: "Method of cooling the computer."
    },
    {
      id: "case",
      text: "Case",
      icon: "file-table-box",
      subtitle: "The housing of every component in the computer."
    },
    {
      id: "cpu",
      text: "CPU",
      icon: "memory",
      subtitle: "The brain of the computer."
    },
    {
      id: "maintenance",
      text: "Maintenance",
      icon: "monitor",
      subtitle: "After the building stage."
    }
  ];

  const [exampleState] = useState(initialElements);
  const [user] = useState(userDocument);

  //if the user is a moderator, then alert them that they are once they enter the social forums screen
  useEffect(async () => {
    //if user is moderator then alert user
    if (
      user.karmaLevel >= 2000 &&
      !user.isMod &&
      !user.hasBeenNotifiedOfModRequest
    ) {
      let docRef = db.collection("Users").doc(auth.currentUser.email);

      docRef
        .update({
          hasBeenNotifiedOfModRequest: true
        })
        .then(() => {
          alert(
            "You have been a major part of the community in helping others. We have put a request in for become a moderator. You will be notified when the request has been accepted."
          );
        });
    } else if (user.isMod && user.hasBeenNotifiedOfModStatus) {
      let docRef = db.collection("Users").doc(auth.currentUser.email);

      docRef
        .update({
          hasBeenNotifiedOfModStatus: true
        })
        .then(() => {
          alert(
            "You have been a major part of the community in helping others. We have put a request in for become a moderator. You will be notified when the request has been accepted."
          );
        });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={exampleState}
        renderItem={item => {
          return (
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                navigation.navigate("ThreadsScreen", {
                  subforumThreadId: item.item.id
                });
              }}
            >
              <Card.Title
                title={item.item.text}
                titleStyle={{ color: "white" }}
                subtitle={item.item.subtitle}
                subtitleStyle={{ color: "white" }}
                left={props => (
                  <Avatar.Icon
                    {...props}
                    icon={item.item.icon}
                    backgroundColor={"#FF8E00"}
                    size={45}
                  />
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        icon="pen"
        size="large"
        style={styles.fab}
        onPress={() => {
          navigation.navigate("Create A Thread");
        }}
        title="Create Thread"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002347"
  },
  touchableOpacity: {
    borderRadius: 50,
    margin: 8,
    shadowColor: "rgba(0,0,0,0)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    backgroundColor: "#003366",
    elevation: 3, // Android
    height: 75
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
    fontSize: 8,
    padding: 10
  },
  authorText: {
    paddingTop: 10,
    fontSize: 10,
    color: "grey"
  },
  tagList: {
    flexDirection: "row"
  },
  tagBubble: {
    backgroundColor: "#7b42f5",
    margin: 10,
    borderRadius: 10,
    padding: 5
  },
  tagText: {
    color: "white",
    fontSize: 15
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF8E00",
    color: "#000"
  }
});

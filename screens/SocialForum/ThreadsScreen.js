import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import { db, firestore } from "../../config/firebase";
import { FAB } from "react-native-paper";

//Handles the description for the thread to either display the shortened version or the full version
const ShortDescription = props => {
  if (props.string.length >= 150) {
    const newString = props.string.substring(0, 150) + " ...";
    return <Text style={styles.desc}>{newString}</Text>;
  } else return <Text style={styles.desc}>{props.string}</Text>;
};

//Returns an image based on if the resolved field is set to true/false
const Resolved = props => {
  if (props.resolve)
    return (
      <Image
        style={styles.itemImg}
        source={{
          uri:
            "https://icons-for-free.com/iconfiles/png/512/checkmark-131964752499076639.png"
        }}
      />
    );
  else
    return (
      <Image
        style={styles.itemImg}
        source={{
          uri: "https://tnunitedsc.com/wp-content/uploads/2022/04/Group-712.png"
        }}
      />
    );
};

const ThreadsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [tutorialList, setTutorialList] = useState([]);

  useEffect(() => {
    const subscriber = db
      .collection("Threads")
      .where("subforum", "in", [route.params.subforumThreadId])
      .onSnapshot(querySnapshot => {
        const threads = [];

        querySnapshot.forEach(documentSnapshot => {
          threads.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          });
        });

        setTutorialList(threads);
        setLoading(false);
      });

    return () => subscriber;
  }, []);

  if (loading) return <ActivityIndicator />;
  else {
    return (
      <View style={styles.container}>
        <FlatList
          data={tutorialList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  navigation.navigate("Comments", { threadId: item.key });
                }}
              >
                <View style={[{ flex: 1, flexDirection: "row" }]}>
                  <Resolved resolve={item.resolved} />
                  <View style={[{ flexShrink: 1 }]}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <ShortDescription string={item.description} />
                    <Text style={styles.authorText}>{item.author}</Text>
                    <FlatList
                      style={styles.tagList}
                      data={item.tag}
                      renderItem={({ item }) => {
                        return (
                          <View style={styles.tagBubble}>
                            <Text style={styles.tagText}>{item}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002347"
  },
  itemContainer: {
    padding: 15,
    borderRadius: 25,
    margin: 8,
    shadowColor: "rgba(0,0,0,0)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    backgroundColor: "#003366",
    elevation: 3 // Android
  },
  itemImg: {
    height: 40,
    width: 40
  },
  itemTitle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "white"
  },
  desc: {
    fontSize: 12,
    paddingLeft: 11,
    color: "white"
  },
  authorText: {
    paddingTop: 10,
    paddingLeft: 11,
    fontSize: 10,
    color: "#FF8E00"
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
    backgroundColor: "#FF8E00"
  }
});

export default ThreadsScreen;

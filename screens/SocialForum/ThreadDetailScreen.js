import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { auth, db } from "../../config/firebase";
import { arrayRemove, doc, getDoc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAB, Button, Chip, Checkbox } from "react-native-paper";
import VoteComponent from "../../components/VoteComponent";
import { tutorialList } from "./AddThreadScreen";
import CommentAuthorComponent from "../../components/CommentAuthor";

const ThreadDetailScreen = ({ navigation, route, isFocused }) => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [resolved, setResolved] = React.useState(false);

  const goToTutorial = (navigation, followedTutorialTitle) => {
    //find followedTutorialDescription in tutorialList
    const tutorial = tutorialList.find(
      tutorial => tutorial.title === followedTutorialTitle
    );

    navigation.navigate("Description", { tutorial: tutorial });
  };

  const getUser = async () => {
    const docRef = doc(db, "Users", auth.currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      docSnap.data();
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //This is used to conditional render the list if there are comments for the thread or if none exist at the moment
  const CommentList = ({ data }) => {
    if (data === undefined) return <View />;
    else {
      if (data.length === 0)
        return (
          <Text
            style={[
              {
                marginTop: 50,
                padding: 10,
                textAlign: "center",
                color: "grey"
              }
            ]}
          >
            Sorry, there are no comments for this thread yet, check back again
            later.
          </Text>
        );
      else
        return (
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemContainer}>
                  <View style={[{ flexDirection: "row" }]}>
                    <VoteComponent
                      comment={item}
                      threadId={route.params.threadId}
                      commentArray={data}
                      userEmail={user.email}
                    />
                    <View
                      style={[
                        {
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flex: 1
                        }
                      ]}
                    >
                      <Text style={styles.itemTitle}>{item.text}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "space-between",
                        flexDirection: "row",
                        flex: 1
                      }
                    ]}
                  >
                    <CommentAuthorComponent author={item.author} />

                    {user.isMod || user.username === item.author ? (
                      <TouchableOpacity
                        style={{ right: 1 }}
                        title="Delete Comment"
                        onPress={() => handleDelete("comment", item)}
                      >
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
              );
            }}
          />
        );
    }
  };

  async function handleDelete(type, comment = null) {
    if (type === "comment") {
      let docRef = db.collection("Threads").doc(route.params.threadId);
      //const query = query(docRef, where("comments", "array-contains", comment.id));

      docRef
        .update({
          comments: arrayRemove(comment)
        })
        .then(() => {
          alert("Comment Deleted!");
        });
    } else {
      await db
        .collection("Threads")
        .doc(route.params.threadId)
        .delete();
      alert("Thread deleted");
      navigation.goBack();
      navigation.refresh();
    }
  }

  useEffect(() => {
    (async () => {
      await getUser();
      const firestoreThread = await db
        .collection("Threads")
        .doc(route.params.threadId)
        .get();
      setThread(firestoreThread.data());
      setLoading(false);
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      //set resolved state // THIS ONLY RUNS WHEN I REFRESH
      if (thread.resolved === true) {
        setResolved(true);
      } else {
        setResolved(false);
      }
    })();
  }, [thread]);

  function handleResolve() {
    setResolved(!resolved);
    db.collection("Threads")
      .doc(route.params.threadId)
      .update({ resolved: !resolved });
  }

  // Show ActivityIndicator if loading
  if (loading) return <ActivityIndicator />;
  else {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {user.isMod || user.username === thread.author ? (
            <View
              style={{
                marginLeft: 11,
                flexDirection: "row"
              }}
            >
              <Checkbox
                color="green"
                status={resolved ? "checked" : "unchecked"}
                onPress={() => {
                  handleResolve();
                }}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Mark as resolved</Text>
              </View>
            </View>
          ) : (
            <View />
          )}
          <Text style={styles.threadTitle}>{thread.title}</Text>
          <Text style={styles.threadAuthor}>{thread.author}</Text>
          <Text style={styles.threadDescription}>{thread.description}</Text>

          {thread.followedTutorial[0] ? (
            <View>
              <Text style={{ color: "#FF8E00", marginLeft: 16 }}>
                Followed Tutorial:{" "}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Chip
                  icon="cube-scan"
                  style={styles.chip}
                  onPress={() =>
                    goToTutorial(navigation, thread.followedTutorial[1])
                  }
                >
                  {thread.followedTutorial[1]}
                </Chip>
                {/* If the user is a moderator, show the delete button */}
                {user.isMod || user.username === thread.author ? (
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      style={{ marginRight: 11 }}
                      title="Delete thread"
                      onPress={() => handleDelete("thread")}
                    >
                      <Ionicons name="trash-outline" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          ) : (
            <View />
          )}

          <CommentList data={thread.comments} />
        </ScrollView>
        <FAB
          icon="comment"
          size="large"
          style={styles.fab}
          onPress={() => {
            navigation.navigate("Create Comment", {
              threadId: route.params.threadId,
              commentList: thread.comments
            });
          }}
          title="Create Thread"
        />
      </View>
    );
  }
};

// STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002347"
  },
  threadAuthor: {
    paddingLeft: 16,
    color: "#FF8E00",
    fontSize: 12
  },
  threadDescription: {
    fontSize: 15,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    color: "white",
    marginBottom: 16
  },
  threadTitle: {
    fontSize: 28,
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 8,
    color: "white"
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
  itemTitle: {
    fontSize: 15,
    paddingLeft: 11,
    color: "white"
  },
  itemAuthor: {
    fontSize: 10,
    padding: 10,
    color: "#FF8E00"
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF8E00",
    color: "#000"
  },
  chip: {
    margin: 10,
    borderRadius: 25,
    backgroundColor: "#FF8E00",
    flexDirection: "row"
  }
});

export default ThreadDetailScreen;

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../config/firebase";
import { arrayUnion, doc, getDoc } from "firebase/firestore";
import { TextInput, Button } from "react-native-paper";

const AddCommentScreen = ({ navigation, route }) => {
  const threadId = route.params.threadId;
  const [user, setUser] = useState({});
  const [, setDate] = useState(null);

  const [comment, setComment] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  });

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

  const addComment = () => {
    if (comment == null) {
      alert("Please fill out the required forms");
    } else {
      let threadRef = db.collection("Threads").doc(threadId);
      let today = new Date();
      let date =
        +today.getDate() +
        " " +
        (today.getMonth() + 1) +
        " " +
        today.getFullYear();
      setDate(date);

      threadRef
        .update({
          comments: arrayUnion({
            id: Date.now(),
            author: user.username,
            createdAt: date,
            karma: 0,
            text: comment,
            upvoters: [],
            downvoters: []
          })
        })
        .then(() => {
          console.log("Comment Created!");
          alert(comment);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        label="Comment"
        theme={{
          colors: {
            placeholder: "gray",
            paddingTop: 0
          }
        }}
        style={{
          backgroundColor: "#002347",
          height: 200,
          textAlignVertical: "top"
        }}
        value={comment}
        activeOutlineColor={"#FF8E00"}
        onChangeText={setComment}
        maxLength={10000}
        mode={"outlined"}
        outlinecolor={"white"}
        textColor={"white"}
      />

      <Button
        style={{ margin: 16 }}
        icon="comment"
        mode="contained"
        color={"#FF8E00"}
        onPress={() => {
          addComment();
          navigation.goBack();
        }}
      >
        Post comment
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002347"
  },
  itemContainer: {
    padding: 15
  },
  itemImg: {
    height: 50,
    width: 50
  },
  button: {
    marginTop: 8,
    padding: 20
  },
  text: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "center"
  },
  input: {
    padding: 10,
    margin: 8,
    fontSize: 18,
    height: 44,
    textAlign: "center",
    borderWidth: 1
  },
  desc: {
    fontSize: 10,
    padding: 10
  }
});

export default AddCommentScreen;

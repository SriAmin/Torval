import * as React from "react";
import { Checkbox } from "react-native-paper";
import { View } from "native-base";
import { Text } from "react-native";
import { db } from "../config/firebase";
import { arrayUnion } from "firebase/firestore";

export default function VoteComponent({ comment, threadId, commentArray }) {
  const [upvoteChecked, setUpvoteChecked] = React.useState(false);
  const [downvoteChecked, setDownvoteChecked] = React.useState(false);
  const [array, setArray] = React.useState(commentArray);
  const [karma, setKarma] = React.useState(0);

  //initialize variable on startup
  React.useEffect(async () => {
    setKarma(comment.karma);
  }, []);

  const updateKarmaFirestore = async () => {
    //karma is always a step behind
    alert(karma);

    //for every comment in commentArray
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == comment.id) {
        array[i].karma = karma;
        break;
      }
    }

    await db
      .collection("Threads")
      .doc(threadId)
      .update({
        comments: array
      });
  };

  const onUpvotePressed = async () => {
    if (downvoteChecked) {
      setDownvoteChecked(false);
    }
    setUpvoteChecked(!upvoteChecked);
    setKarma(upvoteChecked ? karma - 1 : karma + 1);
    await updateKarmaFirestore();
  };

  const onDownvotePressed = async () => {
    if (upvoteChecked) {
      setUpvoteChecked(false);
    }
    setDownvoteChecked(!downvoteChecked);
    setKarma(downvoteChecked ? karma + 1 : karma - 1);
    await updateKarmaFirestore();
  };

  return (
    <View>
      <Checkbox
        status={upvoteChecked ? "checked" : "unchecked"}
        onPress={() => {
          onUpvotePressed();
        }}
        uncheckedColor="white"
      />

      <Text style={{ color: "white" }}>{karma}</Text>

      <Checkbox
        status={downvoteChecked ? "checked" : "unchecked"}
        onPress={() => {
          onDownvotePressed();
        }}
        uncheckedColor="white"
      />
    </View>
  );
}

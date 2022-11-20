import * as React from "react";
import { Checkbox } from "react-native-paper";
import { View } from "native-base";
import { Text } from "react-native";
import { db } from "../config/firebase";

export default function VoteComponent({ comment, threadId, commentArray }) {
  const [upvoteChecked, setUpvoteChecked] = React.useState(false);
  const [downvoteChecked, setDownvoteChecked] = React.useState(false);
  const [array] = React.useState(commentArray);
  const [karma, setKarma] = React.useState(0);

  //initialize variable on startup
  React.useEffect(async () => {
    //set karma of post
    setKarma(comment.karma);

    //if user is in the array of upvoters, set the upvoteChecked to true, vice versa for downvoters
    // if (comment.upvoters.includes(db.auth().currentUser.email)) {
    //   setUpvoteChecked(true);
    // } else if (comment.downvoters.includes(db.auth().currentUser.email)) {
    //   setDownvoteChecked(true);
    // }
  }, []);

  //updating the vote in firestore
  //we update the karma of the post, and add the user to the upvoters/downvoters array
  const updateUpvoteFirestore = async () => {
    //for every comment in the array
    for (let i = 0; i < array.length; i++) {
      //if the comment id matches the comment id of the comment that was passed in, update the karma
      if (array[i].id === comment.id) {
        array[i].karma++;
        setKarma(array[i].karma);
        //replace whole comments array in document with the updated array
        await db
          .collection("Threads")
          .doc(threadId)
          .update({
            comments: array
          });
      }
    }
  };

  //updating the vote in firestore
  //we update the karma of the post, and add the user to the upvoters/downvoters array
  const updateDownvoteFirestore = async () => {
    //for every comment in the array
    for (let i = 0; i < array.length; i++) {
      //if the comment id matches the comment id of the comment that was passed in, update the karma
      if (array[i].id === comment.id) {
        array[i].karma--;
        setKarma(array[i].karma);

        //replace whole comments array in document with the updated array
        await db
          .collection("Threads")
          .doc(threadId)
          .update({
            comments: array
          });
      }
    }
  };

  const onUpvotePressed = async () => {
    if (downvoteChecked) {
      await updateUpvoteFirestore();
      setDownvoteChecked(false);
    }

    if (upvoteChecked) {
      await updateDownvoteFirestore();
    }

    await setUpvoteChecked(!upvoteChecked);

    if (!upvoteChecked) {
      await updateUpvoteFirestore();
    }
  };

  const onDownvotePressed = async () => {
    if (upvoteChecked) {
      await updateDownvoteFirestore();
      setUpvoteChecked(false);
    }

    if (downvoteChecked) {
      await updateUpvoteFirestore();
    }

    await setDownvoteChecked(!downvoteChecked);

    if (!downvoteChecked) {
      await updateDownvoteFirestore();
    }
  };

  return (
    <View>
      <Checkbox
        status={upvoteChecked ? "checked" : "unchecked"}
        onPress={async () => {
          await onUpvotePressed();
        }}
        uncheckedColor="white"
      />

      <Text style={{ color: "white", textAlign: "center" }}>{karma}</Text>

      <Checkbox
        status={downvoteChecked ? "checked" : "unchecked"}
        onPress={async () => {
          await onDownvotePressed();
        }}
        uncheckedColor="white"
      />
    </View>
  );
}

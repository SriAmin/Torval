import * as React from "react";
import { Checkbox } from "react-native-paper";
import { View } from "native-base";
import { Text } from "react-native";
import { db } from "../config/firebase";

export default function VoteComponent({ comment, threadId, commentArray }) {
  const [upvoteChecked, setUpvoteChecked] = React.useState(false);
  const [downvoteChecked, setDownvoteChecked] = React.useState(false);
  const [array, setArray] = React.useState(commentArray);
  const [karma, setKarma] = React.useState(0);

  //initialize variable on startup
  React.useEffect(async () => {
    //if user is in the array of upvoters, set the upvoteChecked to true, vice versa for downvoters
    if (comment.upvoters.includes(db.auth().currentUser.email)) {
      setUpvoteChecked(true);
    } else if (comment.downvoters.includes(db.auth().currentUser.email)) {
      setDownvoteChecked(true);
    }

    //set karma of post
    setKarma(comment.karma);
  }, []);

  //updating the vote in firestore
  //we update the karma of the post, and add the user to the upvoters/downvoters array
  const updateVoteFirestore = async () => {
    //for every comment in the array
    for (let i = 0; i < array.length; i++) {
      //if the comment id matches the comment id of the comment that was passed in, update the karma
      if (array[i].id == comment.id) {
        array[i].karma = karma;

        //if the state upvoteChecked is true, add the user to the upvoters array
        if (upvoteChecked) {
          array[i].upvoters.push(db.auth().currentUser.email);
        }

        //if the state downvoteChecked is true, add the user to the downvoters array,
        else if (downvoteChecked) {
          array[i].downvoters.push(db.auth().currentUser.email);
        }

        //if neither upvoteChecked nor downvoteChecked is true,
        // remove the user from the upvoters OR downvoters array if they are present
        else if (!upvoteChecked && !downvoteChecked) {
          //if user is in the upvoters array, remove them
          if (array[i].upvoters.includes(db.auth().currentUser.email)) {
            array[i].upvoters.splice(
              array[i].upvoters.indexOf(db.auth().currentUser.email),
              1
            );
          }
          //if user is in the downvoters array, remove them
          else if (array[i].downvoters.includes(db.auth().currentUser.email)) {
            array[i].downvoters.splice(
              array[i].downvoters.indexOf(db.auth().currentUser.email),
              1
            );
          }
        }
      }
    }

    //replace whole comments array in document with the updated array
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
    await updateVoteFirestore();
  };

  const onDownvotePressed = async () => {
    if (upvoteChecked) {
      setUpvoteChecked(false);
    }
    setDownvoteChecked(!downvoteChecked);
    setKarma(downvoteChecked ? karma + 1 : karma - 1);
    await updateVoteFirestore();
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

      <Text style={{ color: "white", textAlign: "center" }}>{karma}</Text>

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

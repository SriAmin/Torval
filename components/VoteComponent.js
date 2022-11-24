import * as React from "react";
import { CheckBox } from "react-native-elements";
import { View } from "native-base";
import { Text } from "react-native";
import { db } from "../config/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VoteComponent({
  comment,
  threadId,
  commentArray,
  userEmail
}) {
  const [upvoteChecked, setUpvoteChecked] = React.useState(false);
  const [downvoteChecked, setDownvoteChecked] = React.useState(false);
  const [array] = React.useState(commentArray);
  const [karma, setKarma] = React.useState(0);

  React.useEffect(async () => {
    //set karma of post
    setKarma(comment.karma);

    if (comment.upvoters.includes(userEmail)) {
      setUpvoteChecked(true);
    } else if (comment.downvoters.includes(userEmail)) {
      setDownvoteChecked(true);
    }
  }, []);

  const updateUpvoteFirestore = async () => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === comment.id) {
        array[i].karma++;
        setKarma(array[i].karma);

        //if user has downvoted, remove downvote
        if (array[i].downvoters.includes(userEmail)) {
          array[i].downvoters.splice(array[i].downvoters.indexOf(userEmail), 1);
        } else {
          array[i].upvoters.push(userEmail);
        }

        //get all users in db
        let usersRef = await db.collection("Users").get();
        let users = usersRef.docs.map(doc => doc.data());
        //find user who posted comment
        const user = users.find(user => user.username === comment.author);

        //update karma of user who posted comment in db
        await db
          .collection("Users")
          .doc(user.email)
          .update({
            karmaLevel: user.karmaLevel + 1
          });

        await db
          .collection("Threads")
          .doc(threadId)
          .update({
            comments: array
          });
      }
    }
  };

  const updateDownvoteFirestore = async () => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === comment.id) {
        array[i].karma--;
        setKarma(array[i].karma);

        //if user has upvoted, remove upvote
        if (array[i].upvoters.includes(userEmail)) {
          array[i].upvoters.splice(array[i].upvoters.indexOf(userEmail), 1);
        } else {
          array[i].downvoters.push(userEmail);
        }

        //get all users in db
        let usersRef = await db.collection("Users").get();
        let users = usersRef.docs.map(doc => doc.data());
        //find user who posted comment
        let user = users.find(user => user.username === comment.author);

        //update karma of user who posted comment in db
        await db
          .collection("Users")
          .doc(user.email)
          .update({
            karmaLevel: user.karmaLevel - 1
          });

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
    await setUpvoteChecked(!upvoteChecked);

    if (downvoteChecked) {
      await updateUpvoteFirestore();
      setDownvoteChecked(false);
    }

    if (upvoteChecked) {
      await updateDownvoteFirestore();
    }

    if (!upvoteChecked) {
      await updateUpvoteFirestore();
    }
  };

  const onDownvotePressed = async () => {
    await setDownvoteChecked(!downvoteChecked);

    if (upvoteChecked) {
      await updateDownvoteFirestore();
      setUpvoteChecked(false);
    }

    if (downvoteChecked) {
      await updateUpvoteFirestore();
    }

    if (!downvoteChecked) {
      await updateDownvoteFirestore();
    }
  };

  return (
    <View>
      <CheckBox
        checkedIcon="arrow-up"
        uncheckedIcon="arrow-up"
        checkedColor={"#FD7702"}
        checked={upvoteChecked}
        onPress={async () => {
          await onUpvotePressed();
        }}
        uncheckedColor="white"
      />

      <Text style={{ color: "white", textAlign: "center" }}>{karma}</Text>

      <CheckBox
        checkedIcon="arrow-down"
        uncheckedIcon="arrow-down"
        checkedColor={"#FD7702"}
        checked={downvoteChecked}
        onPress={async () => {
          await onDownvotePressed();
        }}
        uncheckedColor="white"
      />
    </View>
  );
}

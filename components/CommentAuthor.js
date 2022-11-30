import * as React from "react";
import { Text, View } from "native-base";
import { db } from "../config/firebase";
import { Image, StyleSheet } from "react-native";

export default function CommentAuthorComponent({ author }) {
  const [commentAuthor, setCommentAuthor] = React.useState(null);
  const [karma, setKarma] = React.useState(0);
  const [karmaText, setKarmaText] = React.useState("");
  const [karmaColour, setKarmaColour] = React.useState("");
  const [isMod, setIsMod] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  React.useEffect(async () => {
    let usersRef = await db.collection("Users").get();
    setUsers(usersRef.docs.map(doc => doc.data()));
  }, []);

  React.useEffect(async () => {
    setCommentAuthor(await users.find(user => user.username === author));
  }, [users]);

  React.useEffect(async () => {
    await setIsMod(commentAuthor.isMod);
  }, [commentAuthor]);

  React.useEffect(async () => {
    await setKarma(commentAuthor.karmaLevel);
  }, [commentAuthor]);

  React.useEffect(async () => {
    if (karma < 0) {
      setKarmaText(" -" + karma.toString());
      setKarmaColour("red");
    } else if (karma >= 0 && karma <= 70) {
      setKarmaText(" +" + karma.toString());
      setKarmaColour("yellow");
    } else {
      setKarmaText(" +" + karma.toString());
      setKarmaColour("green");
    }
  }, [karma]);

  return (
    <View style={styles.container}>
      {isMod ? (
        <Image
          style={styles.itemImg}
          source={{
            uri: "https://www.iconsdb.com/icons/preview/orange/shield-2-xxl.png"
          }}
        />
      ) : (
        <View />
      )}
      <Text style={styles.author}>{author}</Text>
      <Text style={[styles.karma, { color: karmaColour }]}>{karmaText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", //Centered vertically
    flex: 1,
    marginLeft: 11
  },
  author: {
    fontSize: 10,
    color: "#FF8E00",
    fontWeight: "bold"
  },
  karma: {
    fontSize: 10,
    fontWeight: "bold"
  },
  modStatus: {
    fontSize: 10,
    padding: 10,
    color: "#FF8E00"
  },
  itemImg: {
    height: 15,
    marginRight: 5,
    width: 15
  }
});

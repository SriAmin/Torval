import * as React from "react";
import { Checkbox } from "react-native-paper";
import { View } from "native-base";
import { Text } from "react-native";

export default function VoteComponent({ props }) {
  const [upvoteChecked, setUpvoteChecked] = React.useState(false);
  const [downvoteChecked, setDownvoteChecked] = React.useState(false);
  const [karma, setKarma] = React.useState(0);

  //initialize variable on startup
  React.useEffect(() => {
    setKarma(props.karma);
    alert(props.karma);
  }, []);

  const onUpvotePressed = () => {
    if (downvoteChecked) {
      setDownvoteChecked(false);
    }
    setUpvoteChecked(!upvoteChecked);
    setKarma(upvoteChecked ? karma - 1 : karma + 1);
  };

  const onDownvotePressed = () => {
    if (upvoteChecked) {
      setUpvoteChecked(false);
    }
    setDownvoteChecked(!downvoteChecked);
    setKarma(downvoteChecked ? karma + 1 : karma - 1);
  };

  return (
    <View>
      <Checkbox
        status={upvoteChecked ? "checked" : "unchecked"}
        onPress={() => {
          onUpvotePressed();
        }}
      />

      <Text>{karma}</Text>

      <Checkbox
        status={downvoteChecked ? "checked" : "unchecked"}
        onPress={() => {
          onDownvotePressed();
        }}
      />
    </View>
  );
}

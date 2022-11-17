import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import { auth, db } from "../../config/firebase";
import * as ImagePicker from "expo-image-picker";
import { Picker, Spinner } from "native-base";
import { doc, getDoc } from "firebase/firestore";
import { StackActions } from "@react-navigation/native";

const SocialForumThreadScreen = ({ navigation, route }) => {
  let [JSONResult, setJSONResult] = React.useState();
  const [image, setImage] = React.useState(null);
  const [status] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [subforum, setSubforum] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [followedTutorial, setFollowedTutorial] = React.useState(false);

  const USER_ID = "justingg";
  const PAT = "03e4d15f3e074dd09eb2d7e5dade2814";
  const APP_ID = "torval-app";
  const MODEL_ID = "torval";
  const MODEL_VERSION_ID = "9e7a9f72c9474afc90098de79147c899";

  async function predictImage(image) {
    let IMAGE_BYTES_STRING = image.base64.toString();

    let raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              base64: IMAGE_BYTES_STRING
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
        "Content-Type": "application/json"
      },
      body: raw
    };

    //fetch url
    await fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then(async response => await response.text())
      .then(async result => await setJSONResult(result))
      .catch(error => alert(error));

    JSONResult = JSON.parse(JSONResult);

    // First, get the max vote from the array of objects
    let maxVotes = Math.max(
      ...JSONResult.outputs[0].data.concepts.map(e => e.value)
    );

    // Get the object having votes as max votes
    let obj = JSONResult.outputs[0].data.concepts.find(
      concept => concept.value === maxVotes
    );
    showPrediction(obj.name);
  }

  function showPrediction(prediction) {
    let predictedComputerComponent = "";

    switch (prediction) {
      case "psu":
        predictedComputerComponent = "power supply";
        break;
      case "gpu":
        predictedComputerComponent = "graphics card";
        break;
      case "case":
        predictedComputerComponent = "computer case";
        break;
      case "mobo":
        predictedComputerComponent = "motherboard";
        break;
      case "cpu":
        predictedComputerComponent = "CPU";
        break;
      case "watercooling":
        predictedComputerComponent = "watercooling image";
    }

    return alert(
      "We predict this is a " +
        predictedComputerComponent +
        ", would you like to post to that subforum instead?"
    );
  }

  useEffect(() => {
    (async () => {
      await getUser();
      await askPermissionCameraRollAsync();
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

  const askPermissionCameraRollAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
    } else {
      setPermissions(true);
    }
  };

  const addThreadDoc = () => {
    if (description == null || title == null || subforum == null) {
      alert("Please fill out the required forms");
    } else {
      db.collection("Threads")
        .add({
          author: user.username,
          description: description,
          title: title,
          comments: [],
          resolved: false,
          subforum: subforum,
          upvotes: 0,
          downvotes: 0
        })
        .then(() => {
          alert("Thread added!");
        });
    }
  };

  async function chooseImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      await predictImage(result);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={{
            margin: 16,
            marginBottom: 0,
            backgroundColor: "#002347"
          }}
          label="Thread title"
          theme={{
            colors: {
              placeholder: "gray"
            }
          }}
          value={title}
          activeOutlineColor={"#FF8E00"}
          onChangeText={setTitle}
          maxLength={100}
          mode={"outlined"}
          outlinecolor={"white"}
          textColor={"white"}
        />

        <View>
          <Picker
            selectedValue={subforum}
            style={{ color: "white", margin: 11, marginBottom: 0 }}
            onValueChange={itemValue => setSubforum(itemValue)}
          >
            <Picker.Item label="Please select a subforum" value="null" />
            <Picker.Item label="GPU" value="gpu" />
            <Picker.Item label="CPU" value="cpu" />
            <Picker.Item label="Watercooling" value="watercooling" />
            <Picker.Item label="Motherboard" value="mobo" />
            <Picker.Item label="Power Supply" value="psu" />
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 8,
            marginBottom: 0
          }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={"#FD7702"}
            uncheckedColor={"#FD7702"}
            checked={followedTutorial}
            onPress={async () => {
              setChecked(!checked);
              const pushAction = StackActions.push("TutorialListViewSelect");
              navigation.dispatch(pushAction);
              setChecked(followedTutorial);
            }}
          />
          <Text style={{ color: "white" }}>Followed AR Tutorial</Text>
        </View>

        <View style={styles.threadDescriptionContainer}>
          <TextInput
            multiline
            label="Thread description"
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
            value={description}
            activeOutlineColor={"#FF8E00"}
            onChangeText={setDescription}
            maxLength={10000}
            mode={"outlined"}
            outlinecolor={"white"}
            textColor={"white"}
          />
        </View>

        {permissions === false ? (
          <Button
            onPress={askPermissionCameraRollAsync}
            title="Ask permissions"
            icon="camera"
            mode="contained"
          />
        ) : (
          <>
            {image && <Image style={styles.image} source={{ uri: image }} />}
            {status && <Text style={styles.text}>{status}</Text>}

            {/*Button for image picker, this also displays the prediction of the image*/}
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between"
                }
              ]}
            >
              <Button
                icon="image"
                style={[
                  {
                    margin: 16,
                    height: 50,
                    justifyContent: "center",
                    borderRadius: 25
                  }
                ]}
                mode="contained"
                color={"#FD7702"}
                disabled={isLoading}
                onPress={() => chooseImage()}
              >
                {!isLoading ? (
                  <Text>Gallery</Text>
                ) : (
                  <Spinner color="#eeeeee" />
                )}
              </Button>

              <Button
                icon="camera"
                style={[
                  {
                    margin: 16,
                    height: 50,
                    justifyContent: "center",
                    borderRadius: 25
                  }
                ]}
                mode="contained"
                color={"#FD7702"}
                disabled={isLoading}
                onPress={() => chooseImage()}
              >
                {!isLoading ? <Text>Camera</Text> : <Spinner color="#eeeeee" />}
              </Button>
            </View>

            <Button
              icon="camera"
              style={[
                {
                  margin: 16,
                  height: 50,
                  marginTop: 0,
                  borderRadius: 25,
                  justifyContent: "center"
                }
              ]}
              mode="contained"
              color={"#FF8E00"}
              disabled={isLoading}
              onPress={() => {
                addThreadDoc();
                navigation.goBack();
              }}
            >
              {!isLoading ? (
                <Text>Submit Post</Text>
              ) : (
                <Spinner color="#eeeeee" />
              )}
            </Button>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002347",
    flex: 1
  },
  threadDescriptionContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    color: "transparent",
    margin: 16
  },
  itemContainer: {
    padding: 15,
    flex: 1
  },
  itemImg: {
    height: 50,
    width: 50
  },
  button: {
    margin: 8,
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

export default SocialForumThreadScreen;

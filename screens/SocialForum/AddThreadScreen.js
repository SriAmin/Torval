import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Checkbox,
  Snackbar
} from "react-native-paper";
import { auth, db } from "../../config/firebase";
import * as ImagePicker from "expo-image-picker";
import { Picker, Spinner } from "native-base";
import { doc, getDoc } from "firebase/firestore";
import { Camera } from "expo-camera";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { tutorialList } from "../ARTutorials/TutorialListView";
import {
  USER_ID,
  PAT,
  APP_ID,
  MODEL_ID,
  MODEL_VERSION_ID
} from "../../config/clarifai";

//This is used to determine the full width of the tutorial items in the list
const windowWidth = Dimensions.get("window").width;

//This screen is used to display the inputs required to create a new thread
const SocialForumThreadScreen = ({ navigation }) => {
  const [image] = React.useState(null);
  const [status] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [subforum, setSubforum] = useState(null);
  const [tutorialFollowed, setTutorialFollowed] = useState(null);
  const [user, setUser] = useState({});
  const [isLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [predictedComponent, setPredictedComponent] = React.useState(false);
  const [followedTutorial, setFollowedTutorial] = React.useState([false, null]);
  const [modalActive, setModalActive] = useState(false);
  const [cameraModalActive, setCameraModalActive] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [type] = React.useState(Camera.Constants.Type.back);
  const [camera, setCamera] = React.useState(null);

  //On load, the system will ask for permission to access the camera and photo library
  useEffect(async () => {
    await getPermissionAsync();
  }, []);

  //function to get permission to access the camera and photo library
  const getPermissionAsync = async () => {
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  //gets the camera type, front or back
  const handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  //This function is used to take a picture and send it to the API to be processed
  async function predictImage(image) {
    setIsPredicting(true);
    let IMAGE_BYTES_STRING = image.base64.toString();

    // Create a new FormData object
    const raw = JSON.stringify({
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

    //request to the Clarifai API
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
        "Content-Type": "application/json"
      },
      body: raw
    };

    let JSONResult;

    await fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        JSONResult = JSON.parse(result);
      })
      .catch(error => alert(error));

    if (JSONResult !== undefined) {
      // First, get the max vote from the array of objects
      const maxVotes = Math.max(
        ...JSONResult.outputs[0].data.concepts.map(e => e.value)
      );

      // Get the object having votes as max votes
      const obj = JSONResult.outputs[0].data.concepts.find(
        concept => concept.value === maxVotes
      );

      // if the prediction value is greater than 0.05, then we can say that the image is of that component
      if (maxVotes > 0.05) {
        showPrediction(obj.name);
      } else {
        alert("No component found");
        setIsPredicting(false);
      }
    } else {
      alert("Error Occurred");
      setIsPredicting(false);
    }
  }

  //This function is used to show the prediction to the user
  function showPrediction(prediction) {
    let predictedComputerComponent;

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
        break;
      default:
        predictedComputerComponent = "ERROR";
        break;
    }

    //toggle the snackbar to show the prediction
    setPredictedComponent(predictedComputerComponent);
    setIsPredicting(false);
    onToggleSnackBar();
  }

  useEffect(() => {
    (async () => {
      await getUser();
      await askPermissionCameraRollAsync();
    })();
  }, []);

  //function to get the user from the database
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

  //ask for permission to access the photo library
  const askPermissionCameraRollAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
    } else {
      setPermissions(true);
    }
  };

  //function to submit the thread to the database
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
          downvotes: 0,
          followedTutorial: followedTutorial
        })
        .then(() => {
          alert("Thread added!");
        });
    }
  };

  //function to show the image picker and immediately predict afterwards
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

  //function to show the camera and immediately predict afterwards
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      setCameraModalActive(false);
      await predictImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalActive} animationType="slide">
        <View style={styles.container}>
          <FlatList
            data={tutorialList}
            keyExtractor={item => item.title}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={async () => {
                      setModalActive(false);
                      setTutorialFollowed(tutorialList[index].title);
                      setFollowedTutorial([true, tutorialList[index].title]);
                    }}
                  >
                    <View style={[{ flex: 1 }]}>
                      <Image
                        style={styles.itemImg}
                        source={{
                          uri: item.image
                        }}
                      />
                    </View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </Modal>
      {/*/////////////////////////////////////CAMERA MODAL/////////////////////////////////////*/}
      <Modal visible={cameraModalActive} animationType="slide">
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={ref => {
              setCamera(ref);
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 30
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => setCameraModalActive(false)}
              >
                <Ionicons
                  name="arrow-back-outline"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={async () => {
                  await takePicture();
                }}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => handleCameraType()}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </Modal>
      {/*/////////////////////////////////////CAMERA MODAL/////////////////////////////////////*/}
      <ScrollView>
        <TextInput
          style={{
            margin: 16,
            marginBottom: 0,
            backgroundColor: "#003366"
          }}
          label="Thread title"
          theme={{
            colors: {
              placeholder: "white",
              text: "white",
              primary: "#FD7702",
              underlineColor: "transparent",
              background: "#003489"
            }
          }}
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          outlinecolor={"white"}
          textColor={"white"}
        />

        <View style={styles.threadDescriptionContainer}>
          <TextInput
            multiline
            label="Thread description"
            theme={{
              colors: {
                placeholder: "white",
                text: "white",
                primary: "#FD7702",
                underlineColor: "transparent",
                background: "#003489"
              }
            }}
            style={{
              backgroundColor: "#003366",
              height: 200
            }}
            value={description}
            onChangeText={setDescription}
            maxLength={10000}
            outlinecolor={"white"}
            textColor={"white"}
          />
        </View>

        <View>
          <Picker
            selectedValue={subforum}
            style={{ color: "white", margin: 8, marginBottom: 0 }}
            onValueChange={itemValue => setSubforum(itemValue)}
          >
            <Picker.Item label="Please select a subforum" value="null" />
            <Picker.Item label="GPU" value="gpu" />
            <Picker.Item label="CPU" value="cpu" />
            <Picker.Item label="Watercooling" value="watercooling" />
            <Picker.Item label="Motherboard" value="mobo" />
            <Picker.Item label="Power Supply" value="psu" />
            <Picker.Item label="Maintenance" value="maintenance" />
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
            checked={followedTutorial[0]}
            onPress={async () => {
              if (checked) {
                setChecked(false);
                setFollowedTutorial([false, ""]);
                setTutorialFollowed(null);
              } else {
                setChecked(true);
                setModalActive(true);
              }
            }}
          />
          <View flexDirection="column" justify-content="space-between">
            <Text style={{ color: "white" }}>Followed AR Tutorial</Text>
            <Text style={{ color: "#FD7702" }}>{tutorialFollowed}</Text>
          </View>
        </View>

        <Text style={styles.helperText}>
          Need help deciding what subforum to post to? Take a picture of the
          component and we'll try to predict what it is.
        </Text>

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

              {isPredicting && (
                <ActivityIndicator
                  visible={isPredicting}
                  size="large"
                  color="#ADD8E6"
                />
              )}

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
                onPress={() => setCameraModalActive(true)}
              >
                {!isLoading ? <Text>Camera</Text> : <Spinner color="#eeeeee" />}
              </Button>
            </View>

            <Button
              icon="pencil-box"
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
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{ backgroundColor: "#003366" }}
          theme={{ colors: { accent: "#FF8E00" } }}
          duration={6000}
          action={{
            label: "Yes",
            onPress: () => {
              switch (predictedComponent) {
                case "power supply":
                  setSubforum("psu");
                  break;
                case "graphics card":
                  setSubforum("gpu");
                  break;
                case "computer case":
                  setSubforum("case");
                  break;
                case "motherboard":
                  setSubforum("mobo");
                  break;
                case "CPU":
                  setSubforum("cpu");
                  break;
                case "watercooling image":
                  setSubforum("watercooling");
                  break;
                default:
                  alert("Error");
                  break;
              }
            }
          }}
        >
          We predicted that this image is a {predictedComponent}, would you like
          to change the subforum?
        </Snackbar>
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
    margin: 16,
    marginBottom: 0
  },
  itemContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  itemImg: {
    width: windowWidth - 30,
    height: 150,
    borderRadius: 15
  },
  itemTitle: {
    padding: 10,
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    color: "#FD7702"
  },
  itemDesc: {
    fontSize: 15,
    padding: 10,
    color: "white"
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
  helperText: {
    margin: 10,
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    fontStyle: "italic"
  },
  lottie: {
    width: 100,
    height: 100
  }
});

export default SocialForumThreadScreen;

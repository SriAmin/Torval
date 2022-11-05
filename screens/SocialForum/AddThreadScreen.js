import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {auth, db} from "../../config/firebase";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "native-base";
import {doc, getDoc} from "firebase/firestore";

const SocialForumThreadScreen = ({ navigation, route }) => {
    let [JSONResult, setJSONResult] = React.useState();

    async function predictImage(image) {
        const USER_ID = "justingg";
        const PAT = "03e4d15f3e074dd09eb2d7e5dade2814";
        const APP_ID = "torval-app";
        const MODEL_ID = "torval";
        const MODEL_VERSION_ID = "9e7a9f72c9474afc90098de79147c899";
        const IMAGE_BYTES_STRING = image.base64.toString();

        const raw = JSON.stringify({
            user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
            },
            inputs: [
                {
                    data: {
                        image: {
                            base64: IMAGE_BYTES_STRING,
                        },
                    },
                },
            ],
        });

        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Key " + PAT,
                "Content-Type": "application/json",
            },
            body: raw,
        };

        fetch(
            "https://api.clarifai.com/v2/models/" +
            MODEL_ID +
            "/versions/" +
            MODEL_VERSION_ID +
            "/outputs",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => setJSONResult(result))
            .catch((error) => console.log("error", error));

        JSONResult = JSON.parse(JSONResult);

        // First, get the max vote from the array of objects
        const maxVotes = Math.max(
            ...JSONResult.outputs[0].data.concepts.map((e) => e.value)
        );

        // Get the object having votes as max votes
        const obj = JSONResult.outputs[0].data.concepts.find(
            (concept) => concept.value === maxVotes
        );
        console.log(obj);

        let predictedComputerComponent = "";

        switch (obj.name) {
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

    const [image] = React.useState(null);
    const [status] = React.useState(null);
    const [permissions, setPermissions] = React.useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [subforum, setSubforum] = useState(null);
    const [user, setUser] = useState({});

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

    const askPermissionsAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required");
        } else {
            setPermissions(true);
        }
    };

    const addThreadDoc = () => {
        if (
            description == null ||
            title == null ||
            subforum == null
        ) {
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
                })
                .then(() => {
                    alert("Thread added!");
                });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Title: </Text>

            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter the title of your thread"
                type="text"
                maxLength={100}
            />

            <Text style={styles.text}>Question: </Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter a new thread question"
                type="text"
                maxLength={10000}
            />

            <Picker
                selectedValue={subforum}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setSubforum(itemValue)}
            >
                <Picker.Item label="Please select a subforum" value="null" />
                <Picker.Item label="GPU" value="gpu" />
                <Picker.Item label="CPU" value="cpu" />
                <Picker.Item label="Watercooling" value="watercooling" />
                <Picker.Item label="Motherboard" value="mobo" />
                <Picker.Item label="Power Supply" value="psu" />
            </Picker>

            {permissions === false ? (
                <Button onPress={askPermissionsAsync} title="Ask permissions" />
            ) : (
                <>
                    {image && <Image style={styles.image} source={{ uri: image }} />}
                    {status && <Text style={styles.text}>{status}</Text>}

                    {/*Button for image picker, this also displays the prediction of the image*/}
                    <Button
                        onPress={async () => {
                            // No permissions request is necessary for launching the image library
                            let result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                quality: 1,
                                base64: true,
                            });

                            if (!result.cancelled) {
                                await predictImage(result);
                            }
                        }}
                        title="Take a Picture"
                    />
                </>
            )}

            <Button
                style={styles.button}
                title="Submit"
                onPress={() => {
                    addThreadDoc();
                    navigation.goBack();
                }}
            ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemContainer: {
        padding: 15,
    },
    itemImg: {
        height: 50,
        width: 50,
    },
    button: {
        margin: 8,
        padding: 20,
    },
    text: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: "center",
    },
    input: {
        padding: 10,
        margin: 8,
        fontSize: 18,
        height: 44,
        textAlign: "center",
        borderWidth: 1,
    },
    desc: {
        fontSize: 10,
        padding: 10,
    },
});

export default SocialForumThreadScreen;

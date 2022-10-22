import React, {useState, setState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {db} from "../../config/firebase";
import * as ImagePicker from 'expo-image-picker';

const API_KEY = 'ADD_YOUR_KEY_HERE';
const CLARIFAI_KEY = '151cab954a3945149df6b9659675100f';



class SocialForumThread extends React.Component{
    
}

const SocialForumThreadScreen = ({navigation, route}) => {
    let [JSONResult, setJSONResult] = React.useState();


    async function predictImage(image) {

        const USER_ID = 'justingg';
        const PAT = '03e4d15f3e074dd09eb2d7e5dade2814';
        const APP_ID = 'torval-app';
        const MODEL_ID = 'torval';
        const MODEL_VERSION_ID = '9e7a9f72c9474afc90098de79147c899';
        const IMAGE_BYTES_STRING = image.base64.toString()

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT,
                'Content-Type': 'application/json'
            },
            body: raw
        };

        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.text())
            .then(result => setJSONResult(result))
            .catch(error => console.log('error', error));

        JSONResult = JSON.parse(JSONResult)
        //JSONResult = await JSONResult.outputs[0].data.concepts

        // First, get the max vote from the array of objects
        var maxVotes = Math.max(...JSONResult.outputs[0].data.concepts.map(e => e.value));

// Get the object having votes as max votes
        var obj = JSONResult.outputs[0].data.concepts.find(game => game.value === maxVotes);

        let predictedComputerComponent;

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
        alert("We predict this is a " + predictedComputerComponent + ", would you like to post to that subforum instead?")
    }

    const [image, setImage] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [permissions, setPermissions] = React.useState(false);

    const askPermissionsAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
        } else {
            setPermissions(true);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            await predictImage(result);
        }
    }

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [author, setAuthor] = useState(null)

    const addThreadDoc = () => {
        db
        .collection('Threads')
        .add({
            author: author,
            description: description,
            title: title,
            tags: ["New"],
            comments: [],
            followedTutorial: true,
            resolved: false,
        })
        .then(() => {
            alert('Thread added!');
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text} >Title: </Text>

            <TextInput 
                style={styles.input} 
                value={title}
                onChangeText={setTitle}
                placeholder="Enter the title of your thread" 
                type="text" />

            <Text style={styles.text} >Question: </Text>
            <TextInput 
                style={styles.input} 
                value={description}
                onChangeText={setDescription}
                placeholder='Enter a new thread question' 
                type="text" />

            <Text style={styles.text} >Username: </Text>
            <TextInput 
                style={styles.input} 
                value={author}
                onChangeText={setAuthor} 
                placeholder='Enter your username (optional)' 
                type="text" />

            {permissions === false ? (
                <Button onPress={askPermissionsAsync} title="Ask permissions" />
            ) : (
                <>
                    {image && <Image style={styles.image} source={{ uri: image }} />}
                    {status && <Text style={styles.text}>{status}</Text>}
                    <Button onPress={pickImage()} title="Take a Picture" />
                </>
            )}

            <Button style={styles.button} title="Submit" onPress={() => {
                addThreadDoc();
                navigation.goBack();
            }}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
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
      textAlign: 'center',
    },
    input: {
        padding: 10,
        margin:8,
        fontSize: 18,
        height: 44,
        textAlign: 'center',
        borderWidth: 1,
    },
    desc: {
        fontSize: 10,
        padding: 10,
    }
  });


export default SocialForumThreadScreen;
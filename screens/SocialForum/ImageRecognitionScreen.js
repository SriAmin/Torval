import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const API_KEY = 'ADD_YOUR_KEY_HERE';
const CLARIFAI_KEY = '151cab954a3945149df6b9659675100f';

async function predictImage(image) {

    console.log(image.base64);

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
            'Content-Type': 'application/json',
        },
        body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => console.log(response.text()))
        .then(result => console.log(result.json))
        .catch(error => console.log('error', error));

}

export default function App() {
    const [image, setImage] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [permissions, setPermissions] = React.useState(false);

    const askPermissionsAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
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

    return (
        <View style={styles.container}>
            {permissions === false ? (
                <Button onPress={askPermissionsAsync} title="Ask permissions" />
            ) : (
                <>
                    {image && <Image style={styles.image} source={{ uri: image }} />}
                    {status && <Text style={styles.text}>{status}</Text>}
                    <Button onPress={pickImage()} title="Take a Picture" />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    text: {
        margin: 5,
    },
});
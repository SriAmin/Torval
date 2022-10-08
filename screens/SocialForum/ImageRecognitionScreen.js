import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {Alert} from "react-native-web";

const API_KEY = 'ADD_YOUR_KEY_HERE';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
const CLARIFAY_KEY = '151cab954a3945149df6b9659675100f';

async function callGoogleVisionAsync(image) {

    const clarifai = new Clarifai.App({
        apiKey: CLARIFAY_KEY
    })
    process.nextTick = setImmediate // RN polyfill
    const { data } = image
    const file = { base64: data }
    clarifai.models.predict(Clarifai.FOOD_MODEL, file)
        .then(response => {
            const { concepts } = response.outputs[0].data
            if (concepts && concepts.length > 0) {
                for (const prediction of concepts) {
                    if (prediction.name === 'pizza'
                        && prediction.value >= 0.99) {
                        return this.setState({
                            loading: false,
                            result: 'Pizza'
                        })
                    }
                    this.setState({ result: 'Not Pizza' })
                }
            }
            this.setState({ loading: false })
        })
        .catch(e => {
            alert(e)
        })

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

    const takePictureAsync = async () => {
        let result;
        result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            await callGoogleVisionAsync(result)
        }

        if (!cancelled) {
            setImage(uri);
            setStatus('Loading...');
            try {
                const result = await callGoogleVisionAsync(base64);
                setStatus(result);
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        } else {
            setImage(null);
            setStatus(null);
        }
    };

    return (
        <View style={styles.container}>
            {permissions === false ? (
                <Button onPress={askPermissionsAsync} title="Ask permissions" />
            ) : (
                <>
                    {image && <Image style={styles.image} source={{ uri: image }} />}
                    {status && <Text style={styles.text}>{status}</Text>}
                    <Button onPress={takePictureAsync} title="Take a Picture" />
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
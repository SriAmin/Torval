import React, { useState } from 'react';
import { Button, Form, Input, Item, Label, Spinner, Text } from 'native-base';
import { View, StyleSheet, Image } from "react-native";
import { auth } from '../config/firebase';
import { SafeAreaView } from "react-navigation";
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase';

const SignUp = ({ navigation }) => {
  const [txtEmail, setEmail] = useState('');
  const [txtPassword, setPassword] = useState('');
  const [txtName, setName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const createAccount = async () => {
    setLoading(true);
    await auth
      .createUserWithEmailAndPassword(txtEmail, txtPassword)
      .then(result => {
        if (result) {
          updateProfile(auth.currentUser, {
            displayName: txtName, photoURL: image
          }).then(async () => {
            console.log(result.user);
            // Add a new document in collection "Users"
            await setDoc(doc(db, "Users", result.user.email.toString()), {
              email: result.user.email,
              isMod: false,
              karmaLevel: 0,
              username: result.user.displayName,
              ModForums: [],
              tutorialLastStep: {
                buildAComputer: 1,
                cleanAComputer: 1,
                gpuInstallation: 1,
                waterCooling: 1
              },
              uid: result.user.uid,
              photoURL: image.toString()
            })
          }).catch((error) => {
            alert(error);
          });
          alert(
            'Account has been created. You will be automatically logged in.'
          );
        }
        setLoading(false);
        navigation.goBack();
      })
      .catch(({ message }) => {
        alert(message);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Button style={styles.buttons} onPress={pickImage}>
        <Text>Pick an image from camera roll</Text>
      </Button>
      <View style={{ alignItems: "center" }}>
        {image && <Image source={{ uri: image }} style={styles.profilePicture} />}
      </View>
      <Item floatingLabel>
        <Input 
          value={txtEmail} 
          onChangeText={setEmail} 
          style={styles.textInput}
          placeholder="Email"
        />
      </Item>

      <Item floatingLabel>
        <Input 
          value={txtName} 
          onChangeText={setName} 
          style={styles.textInput}
          placeholder="Name"
        />
      </Item>

      <Item floatingLabel>
        <Input
          secureTextEntry
          value={txtPassword}
          onChangeText={setPassword}
          style={styles.textInput}
          placeholder="Password"
        />
      </Item>
      <Button
        style={styles.buttons}
        onPress={createAccount}
        disabled={isLoading}
      >
        {!isLoading ? <Text>Create Account</Text> : <Spinner color="#eeeeee" />}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#002347"
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderWidth: 3,
    marginTop: 15,
    borderColor: "#FF8E00",
    borderRadius: 100,
  },
  textInput: {
    color: "white",
  },
  buttons: {
    backgroundColor: "#FF8E00",
    marginTop: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default SignUp;
import React, { useState } from 'react';
import { Button, Form, Input, Item, Label, Spinner, Text } from 'native-base';
import { auth } from '../config/firebase';
import { SafeAreaView } from "react-navigation";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
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
                displayName: txtName, photoURL: image.photoURL
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
                  uid: result.user.uid
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
    <SafeAreaView style={{ padding: 20 }}>
      <Form>

        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


        <Item floatingLabel>
          <Label>Email</Label>
          <Input value={txtEmail} onChangeText={setEmail} />
        </Item>

        <Item floatingLabel>
          <Label>Name</Label>
          <Input value={txtName} onChangeText={setName} />
        </Item>

        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry
            value={txtPassword}
            onChangeText={setPassword}
          />
        </Item>


      </Form>
      <Button
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={createAccount}
        disabled={isLoading}
      >
        {!isLoading ? (
          <Text>Create Account</Text>
        ) : (
          <Spinner color="#eeeeee" />
        )}
      </Button>
      <Button
        transparent
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text>Back to Login</Text>
      </Button>
    </SafeAreaView>
  );
};

export default SignUp;
import React, { useState } from 'react';
import {
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Spinner,
    Text, View
} from 'native-base';

import { auth } from '../config/firebase';
import {SafeAreaView} from "react-navigation";
import * as ImagePicker from 'expo-image-picker';
import {Image} from "react-native";
import {updateProfile} from "firebase/auth";

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
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

  const createAccount = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(txtEmail, txtPassword)
      .then(result => {
        if (result) {
            updateProfile(auth.currentUser, {
                displayName: txtName, photoURL: image.photoURL
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
          alert(
            'Account has been created. You will be automatically logged in.'
          );
          navigation.goBack();
        }

        setLoading(false);
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
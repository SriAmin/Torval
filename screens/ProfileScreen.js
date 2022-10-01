import React from 'react';
import { Button, Container, Header, Text, View } from 'native-base';
import Login from "./Login";
import GlobalStylesheet from "./GlobalStylesheet";

import { auth } from '../config/firebase';
import {SafeAreaView} from "react-navigation";
import {Image, TextInput} from "react-native";
import Toast from 'react-native-toast-message';
import { getAuth, deleteUser, updateProfile } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => navigation.navigate('Login'));
  };

    const auth = getAuth();

    const deleteAcct = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user.isAnonymous) {
            alert(
                'Account is anonymous. Click logout to exit anonymous account'
            );
        } else {
            deleteUser(user).then(() => {
                alert(
                    'Account has been deleted. You will be redirected to the login screen.'
                );
                auth.signOut().then(() => navigation.navigate('Login'));
            }).catch((error) => {
                console.log(error)
            });
        }
    };

  return (
      <Container>
          <SafeAreaView style={{ padding: 20 }}>
              <Text>Welcome {auth.name}!</Text>
                  <TextInput>
                      UID: {auth.currentUser.uid}
                  </TextInput>

              <TextInput>
                  Username: {auth.currentUser.displayName}
              </TextInput>


              <Image width={100} height={100} source={{uri: auth.currentUser.photoURL}}>
              </Image>

              <TextInput>
                  New Password:
              </TextInput>


                  <Button style={{ marginTop: 20 }} onPress={logout}>
                      <Text>Logout</Text>
                  </Button>

                  <Button style={{ marginTop: 20 }} onPress={deleteAcct}>
                      <Text>Delete Account</Text>
                  </Button>

                  <Button style={{ marginTop: 20 }}
                          onPress={() => navigation.navigate('GlobalStylesheet')}>
                      <Text>Stylesheet (Devs only)</Text>
                  </Button>
          </SafeAreaView>
      </Container>
  );
};

export default ProfileScreen;
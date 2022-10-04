import React, {useEffect} from 'react';
import {Button, Container, Text} from 'native-base';
import Login from "./Login";
import GlobalStylesheet from "./GlobalStylesheet";
import {auth as auth} from '../config/firebase';
import {SafeAreaView} from "react-navigation";
import {Image, TextInput} from "react-native";
import {deleteUser} from "firebase/auth";
import firebase from "firebase/compat/app";


const ProfileScreen = ({navigation}) => {

    //Log out of current user
    const logout = () => {
        auth.signOut().then(() => navigation.navigate('Login'));
    };


    const deleteAcct = () => {
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

    let isMod;
    let karmaLevel;
    let username;
    let ModForums
    let currUser;

    useEffect(() => {
        firebase.firestore()
            .collection("Users")
            .doc(auth.currentUser.email)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    currUser = doc.data();
                    isMod = currUser.isMod;
                    karmaLevel = currUser.karmaLevel;
                    username = currUser.username;
                    ModForums = currUser.ModForums;
                    return (doc)
                } else {
                    return alert("Data does not exist");
                }
            });
    })

    return (
        <Container>
            <SafeAreaView style={{padding: 20}}>
                <Text>Welcome {auth.currentUser.displayName}!</Text>
                <Text>FIRESTORE VALUES</Text>
                <Text>isMod?: {currUser.isMod.toString()}</Text>

                <TextInput>
                    UID: {auth.currentUser.uid}
                </TextInput>

                <TextInput>
                    Username: {auth.currentUser.username}
                </TextInput>

                <Image width={100} height={100} source={{uri: auth.currentUser.photoURL}}></Image>

                <TextInput>
                    New Password:
                </TextInput>


                <Button style={{marginTop: 20}} onPress={logout}>
                    <Text>Logout</Text>
                </Button>

                <Button style={{marginTop: 20}} onPress={deleteAcct}>
                    <Text>Delete Account</Text>
                </Button>

                <Button style={{marginTop: 20}}
                        onPress={() => navigation.navigate('GlobalStylesheet')}>
                    <Text>Stylesheet (Devs only)</Text>
                </Button>
            </SafeAreaView>
        </Container>
    );
};

export default ProfileScreen;
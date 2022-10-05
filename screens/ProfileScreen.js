import React, {useEffect, useState} from 'react';
import {Button, Container, Text} from 'native-base';
import Login from "./Login";
import GlobalStylesheet from "./GlobalStylesheet";
import {auth as auth, db} from '../config/firebase';
import {SafeAreaView} from "react-navigation";
import {Image, TextInput} from "react-native";
import {deleteUser} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";


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

    let [user, setUser] = useState({});

    const getUser = async () => {
        const docRef = doc(db, "Users", auth.currentUser.email.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:" + docSnap.data());
            setUser(docSnap.data());
            alert(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            alert("No such document!");
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <Container>
            <SafeAreaView style={{padding: 20}}>
                <Text>Welcome {auth.currentUser.displayName}!</Text>
                <Text>FIRESTORE VALUES</Text>
                <Text>isMod?: undefined</Text>

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
import React, { useEffect, useState } from 'react';
import { Button, Container, Text } from 'native-base';
import { auth as auth, db } from '../config/firebase';
import { SafeAreaView } from "react-navigation";
import { Image, TextInput, Modal, StyleSheet, View} from "react-native";
import { deleteUser, updateProfile} from "firebase/auth";
import { doc, getDoc, updateDoc} from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileScreen = ({ navigation }) => {
    const authUser = auth.currentUser;
    const [user, setUser] = useState({});
    const [modalOpen, setModelOpen] = useState(false);
    const [displayName, setDisplayName] = useState(authUser.displayName);

    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png");

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

    const getUser = async () => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const updateUser = async () => {
        await updateProfile(auth.currentUser, {
            displayName: displayName, photoURL: image
          }).then(async () => {
            const userRef = doc(db, "Users", auth.currentUser.email);
            await updateDoc(userRef, {
                displayName: displayName
            });
          }).catch((error) => {
            alert(error);
          });
        alert("User Profile has Updated");
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <Container>

            <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalStyle}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            style={styles.profileIcon}
                            source={{
                                uri: image,
                            }}
                        />
                    </TouchableOpacity>
                    <TextInput 
                        style={styles.displayNameInput}
                        onChangeText={(text) => {setDisplayName(text)}}
                        value={displayName}
                    />
                    <Button style={{ marginTop: 20, paddingHorizontal: 50 }} onPress={() => {
                        updateUser();
                        setModelOpen(false);
                    }}>
                        <Text>Update</Text>
                    </Button>
                    <Button style={{ marginTop: 20, paddingHorizontal: 50 }} onPress={() => {
                        setModelOpen(false);
                    }}>
                        <Text>Cancel</Text>
                    </Button>
                </View>
            </Modal>

            <SafeAreaView style={{ padding: 20 }}>
                <Text>Welcome {auth.currentUser.displayName}!</Text>
                <Text>FIRESTORE VALUES</Text>
                <Text>isMod?: {user.isMod ? "Yes" : "No"}</Text>

                <TextInput>
                    UID: {auth.currentUser.uid}
                </TextInput>

                <TextInput>
                    Username: {user.username}
                </TextInput>

                <Image width={100} height={100} source={{ uri: auth.currentUser.photoURL }}></Image>

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
                    onPress={() => setModelOpen(true)}>
                    <Text>Update Profile</Text>
                </Button>

                <Button style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('GlobalStylesheet')}>
                    <Text>Stylesheet (Devs only)</Text>
                </Button>
            </SafeAreaView>
        </Container>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        marginTop: 150,
        alignItems: "center",
    },
    profileIcon: {
        height: 200,
        width: 200,
        borderRadius: 200 / 2
    },
    displayNameInput: {
        marginVertical: 15,
        borderWidth: 2,
        width: 200,
        paddingVertical: 10,
        paddingLeft: 5
    }
});

export default ProfileScreen;
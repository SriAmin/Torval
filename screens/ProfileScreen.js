import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Item, Text } from 'native-base';
import { auth as auth, db } from '../config/firebase';
import { SafeAreaView } from "react-navigation";
import { Image, TextInput, Modal, StyleSheet, View} from "react-native";
import { deleteUser, updateProfile, updatePassword} from "firebase/auth";
import { doc, getDoc, updateDoc} from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileScreen = ({ navigation }) => {
    const authUser = auth.currentUser;
    const [user, setUser] = useState({});
    const [modalOpen, setModelOpen] = useState(false);
    const [displayName, setDisplayName] = useState(authUser.displayName);
    const [password, setPassword] = useState("");

    const [image, setImage] = useState(auth.currentUser.photoURL);

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
    console.log("PhotoURL: " + auth.currentUser.photoURL);

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
            await updatePasswordAuth()
          }).catch((error) => {
            alert(error);
          });
        alert("User Profile has Updated");
    }

    const updatePasswordAuth = async () => {
        if (password != "") {
            await updatePassword(auth.currentUser, password).then(() => {
                // Update successful.
                alert("Password Update successful")
            }).catch((error) => {
                alert("Error Occur: " + error);
            });
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <View style={styles.container}>
            <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalStyle}>
                    <TouchableOpacity style={styles.imageSelector} onPress={pickImage}>
                        <Image
                            style={styles.profileIcon}
                            source={{
                                uri: image,
                            }}
                        />
                    </TouchableOpacity>
                    <Form>
                        <Item>
                            <Input 
                                value={displayName} 
                                onChangeText={setDisplayName} 
                                placeholder="Name"
                                style={{color: "white"}}
                            />
                        </Item>
                        <Item style={{marginVertical: 15}}>
                            <Input 
                                value={password} 
                                onChangeText={setPassword} 
                                placeholder="New Password"
                                secureTextEntry
                                style={{color: "white"}}
                            />
                        </Item>
                    </Form>
                    <Button style={styles.buttons} onPress={() => {
                        updateUser();
                        setModelOpen(false);
                    }}>
                        <Text>Update</Text>
                    </Button>
                    <Button style={styles.buttons} onPress={() => {
                        setModelOpen(false);
                    }}>
                        <Text>Cancel</Text>
                    </Button>
                </View>
            </Modal>

            <View style={styles.formContainer}>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.userTitle}>Welcome {auth.currentUser.displayName}!</Text>
                        <Image style={styles.profilePicture} source={{ uri: auth.currentUser.photoURL.toString() }} />
                        {user.isMod ? 
                            <Image
                                style={styles.moderatorImg}
                                source={{
                                    uri: "https://www.iconsdb.com/icons/preview/orange/shield-2-xxl.png"
                                }}
                            /> 
                        : <View />}
                    <Text style={styles.profileText}> Email: {user.email}</Text>
                    <Text style={styles.profileText}> Karma Level: {user.karmaLevel}</Text>
                </View>

                <Button style={styles.buttons} onPress={logout}>
                    <Text>Logout</Text>
                </Button>

                <Button style={styles.buttons} onPress={deleteAcct}>
                    <Text>Delete Account</Text>
                </Button>

                <Button style={styles.buttons}
                    onPress={() => setModelOpen(true)}>
                    <Text>Update Profile</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#002347",
        alignContent: "center"
    },
    formContainer: {
        flex: 1,
        padding: 15,
    },
    userTitle: {
        fontSize: 24,
        color: "#FF8E00"
    },
    profilePicture: {
        marginVertical: 15,
        borderWidth: 3,
        borderRadius: 100,
        borderColor: "#FF8E00",
        height: 125,
        width: 125
    },
    moderatorImg: {
        marginVertical: 5,
        height: 30,
        width: 30
    },
    profileText: {
        color: "white",
        fontSize: 16,
    },
    modalStyle: {
        flex: 1,
        paddingTop: 150,
        padding: 15,
        backgroundColor: "#002347",
    },
    imageSelector: {
        alignItems: "center",
    },
    profileIcon: {
        height: 200,
        width: 200,
        borderWidth: 3,
        borderRadius: 100,
        borderColor: "#FF8E00",
    },
  buttons: {
    backgroundColor: "#FF8E00",
    marginTop: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProfileScreen;
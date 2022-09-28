import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const anonymousSignIn = () => {
    auth()
        .signInAnonymously()
        .then(() => {
            console.log('User signed in anonymously');
        })
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
            }

            console.error(error);
        })
}


const logOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

const Login = ({navigation}) => {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View style={styles.container}>
                <Button
                    title="Login"
                />
                <Button
                    title="Log in anonymously"
                    onPress={anonymousSignIn()}
                />
                <Button
                    title="Sign up"
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Button
                title="Log out"
                onPress={logOut()}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Login;

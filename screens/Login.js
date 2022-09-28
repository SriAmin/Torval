import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import auth from 'react-native-firebase/auth';

const Login = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Button 
                title="Login"
                onPress={() => {navigation.navigate('Torval')}}
            />
            <Button
                title="Sign Up"
                onPress={() => {navigation.navigate('Torval')}}
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

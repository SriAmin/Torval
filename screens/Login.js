import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';

const Login = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Button 
                title="Login"
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

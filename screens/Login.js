import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';

const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Button 
                title='Hello'
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SocialForumScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Social Forum Main page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default SocialForumScreen;
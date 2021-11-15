import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TutorialView = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello from Tutorial View</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    itemImg: {
        width: windowWidth - 30,
        height: 150,
        borderRadius: 15,
    },
    itemTitle: {
      padding: 10,
      marginBottom: 15,
      fontSize: 18,
      textAlign: "center",
      color: "#7b42f5"
    },
    desc: {
        fontSize: 15,
        padding: 10,
        color: "darkslategrey"
    }
  });

export default TutorialView;

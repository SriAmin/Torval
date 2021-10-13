import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

const tutorialList = [
    {
        "title" : "Building a Computer",
        "description" : "This tutorial will be an large guide on building your computer and getting it running",
        "difficulty" : "Begineer"
    },
    {
        "title" : "Cleaning your computer",
        "description" : "We can understand, the computer tends to get dirty, this guide will show a proper way to clean it",
        "difficulty" : "Begineer"
    },
    {
        "title" : "Replacing the Graphics Card",
        "description" : "Will demonstrate how to remove and add a new graphcis card to the computer",
        "difficulty" : "Novice"
    },
    {
        "title" : "Watercooling",
        "description" : "Watercooling is a difficult process, let us guide your through it",
        "difficulty" : "Intermediate"
    },
]

const ARScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tutorialList}
                keyExtractor={item => item.title}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => {alert('Difficulty: ' + item.difficulty)}}>
                            <View style={[{flex:1,flexDirection:'row'}]}>
                                <Image style={styles.itemImg} 
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}/>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </View>
                            <Text styles={styles.desc}>{item.description}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    itemContainer: {
        padding: 15,
    },
    itemImg: {
        height: 50,
        width: 50,
    },
    itemTitle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    desc: {
        fontSize: 10,
        padding: 10,
    }
  });

export default ARScreen;

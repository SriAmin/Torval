import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, Touchable } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//JSON file meant to hold the data for each AR tutorial
const tutorialList = [
    {
        "title" : "Building a Computer",
        "description" : "This tutorial will be an large guide on building your computer and getting it running",
        "difficulty" : 3
    },
    {
        "title" : "Cleaning your computer",
        "description" : "We can understand, the computer tends to get dirty, this guide will show a proper way to clean it",
        "difficulty" : 1
    },
    {
        "title" : "Replacing the Graphics Card",
        "description" : "Will demonstrate how to remove and add a new graphcis card to the computer",
        "difficulty" : 2
    },
    {
        "title" : "Watercooling",
        "description" : "Watercooling is a difficult process, let us guide your through it",
        "difficulty" : 5
    },
]

const TutorialListView = ({navigation}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tutorialList}
                keyExtractor={item => item.title}
                renderItem={({item}) => {
                    return (
                        <View style={styles.itemContainer}>
                            <View style={[{flex:1}]}>
                                <Image style={styles.itemImg} 
                                    source={{
                                        uri: 'https://image.shutterstock.com/image-photo/business-woman-working-on-modern-260nw-1364492978.jpg',
                                    }}/>
                            </View>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.desc}>{item.description}</Text>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    console.log(item)
                                    navigation.navigate('Description', { tutorial: item })
                                }}> 
                                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    navigation.navigate('Tutorial', { tutorial: item })
                                }}>
                                    <AntDesign name="caretright" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
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
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row"
    },
    button: {
        flex: 1,
        backgroundColor: "#7b42f5",
        margin: 5,
        padding: 12.5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
  });

export default TutorialListView;

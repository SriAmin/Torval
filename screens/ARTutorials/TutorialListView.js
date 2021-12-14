/*
TutorialListView.js

This file is first presented to the use within the Stack Navigator and the AR Tutorials component.
It mainly contains a list of tutorials that the user can interact with. Users can navigate to
TutorialDescriptionView, and TutorailView to start the AR Tutorial.
*/

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

import {
    ViroBox,
} from '@viro-community/react-viro';

//This is used to determine the full width of the tutorial items in the list
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//JSON file holds the mock data that the tutorial list will be holding and presenting
const tutorialList = [
    {
        "image" : "https://thumbs.dreamstime.com/b/amd-ryzen-cpu-technician-fingers-above-motherboard-part-custom-pc-build-los-angeles-ca-usa-december-169345127.jpg",
        "title" : "Building a Computer",
        "description" : "This tutorial will be an large guide on building your computer and getting it running",
        "difficulty" : 3
    },
    {
        "image" : "https://media.istockphoto.com/photos/woman-hand-cleaning-laptop-screen-picture-id838903752?k=20&m=838903752&s=612x612&w=0&h=159rYlbMkonNYu3Wt2SnvGSEB67d9cLn4auusaPKAkE=",
        "title" : "Cleaning your computer",
        "description" : "We can understand, the computer tends to get dirty, this guide will show a proper way to clean it",
        "difficulty" : 1
    },
    {
        "image" : "https://thumbs.dreamstime.com/b/gpu-video-card-hand-isolated-white-167007044.jpg",
        "title" : "Replacing the Graphics Card",
        "description" : "Will demonstrate how to remove and add a new graphcis card to the computer",
        "difficulty" : 2
    },
    {
        "image" : "https://image.shutterstock.com/image-photo/led-light-fancomputer-water-cooling-260nw-664824976.jpg",
        "title" : "Watercooling",
        "description" : "Watercooling is a difficult process, let us guide your through it",
        "difficulty" : 5
    },
]

//JSON file contains the tutorial information such as teh instructions and models
const tutorial = [
    {
        "model" : require('../../models/notebook.obj'),
        "instruction" : "Hello welcome to the first screen of the Tutorial, please look around, test out the AR Functionality, when your're ready tap the next button to see the next AR Scene"
    },
    {
        "model" : <ViroBox position={[0.0, 0.0, 0.0]} scale={[.1, .1, .1]}  />,
        "instruction" : "This is the 2nd set of instructions of the tutorial, this is simply a white cube but please interact if you desire to. Thank you!"
    }
]

const TutorialListView = ({navigation}) => {
    /*
    TutorialListView displays a FlatList component which contains a list of all the tutorials
    It contains an image, a title, description and two buttons that navigate to the
    TutorialDescriptionView and TutorialView

    Parameters:
    navigation object that is given from react navigation to allow the use of react navigation functions

    Return:
    FlatList component
    */

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
                                        uri: item.image,
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
                                    if (Platform.OS == "web") {
                                        alert("Sorry, currently this function doesn't work properly on this platform.")
                                    } else {
                                        navigation.navigate('Tutorial', { tutorial: tutorial })
                                    }
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

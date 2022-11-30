/*
TutorialListView.js

This file is first presented to the use within the Stack Navigator and the AR Tutorials component.
It mainly contains a list of tutorials that the user can interact with. Users can navigate to
TutorialDescriptionView, and TutorailView to start the AR Tutorial.
*/

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { userDocument } from '../../config/firebase';

//This is used to determine the full width of the tutorial items in the list
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let itemImageWidth;

//JSON file holds the mock data that the tutorial list will be holding and presenting
const tutorialList = [
    {
        "image" : "https://thumbs.dreamstime.com/b/amd-ryzen-cpu-technician-fingers-above-motherboard-part-custom-pc-build-los-angeles-ca-usa-december-169345127.jpg",
        "title" : "Building a Computer",
        "description" : "This tutorial will be an large guide on building your computer and getting it running",
        "difficulty" : 3,
        "lastStep" : 1
    },
    {
        "image" : "https://media.istockphoto.com/photos/woman-hand-cleaning-laptop-screen-picture-id838903752?k=20&m=838903752&s=612x612&w=0&h=159rYlbMkonNYu3Wt2SnvGSEB67d9cLn4auusaPKAkE=",
        "title" : "Cleaning your computer",
        "description" : "We can understand, the computer tends to get dirty, this guide will show a proper way to clean it",
        "difficulty" : 1,
        "lastStep" : 1
    },
    {
        "image" : "https://thumbs.dreamstime.com/b/gpu-video-card-hand-isolated-white-167007044.jpg",
        "title" : "Replacing the Graphics Card",
        "description" : "Will demonstrate how to remove and add a new graphcis card to the computer",
        "difficulty" : 2,
        "lastStep" : 1
    },
    {
        "image" : "https://image.shutterstock.com/image-photo/led-light-fancomputer-water-cooling-260nw-664824976.jpg",
        "title" : "Watercooling",
        "description" : "Watercooling is a difficult process, let us guide your through it",
        "difficulty" : 5,
        "lastStep" : 1
    },
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
   
    if (userDocument != undefined) {
        const lastStep = userDocument.tutorialLastStep;
        if (lastStep != undefined || lastStep != null) {
            tutorialList[0].lastStep = lastStep.buildAComputer
            tutorialList[1].lastStep = lastStep.cleanAComputer
            tutorialList[2].lastStep = lastStep.gpuInstallation
            tutorialList[3].lastStep = lastStep.waterCooling
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tutorialList}
                keyExtractor={item => item.title}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.itemContainer}>
                            <View style={[{flex:1}]}>
                                <Image style={styles.itemImg} 
                                    source={{
                                        uri: item.image,
                                    }}/>
                                <View style={styles.progressOverlay}/>
                            </View>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.desc}>{item.description}</Text>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    console.log(item)
                                    navigation.navigate('Description', { tutorial: item, tutorialIndex: index})
                                }}> 
                                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    if (Platform.OS == "web") {
                                        alert("Sorry, currently this function doesn't work properly on this platform.")
                                    } else {
                                        navigation.navigate('Tutorial', {tutorialIndex: index})
                                    }
                                }}>
                                    <AntDesign name="caretright" size={24} color="white" />
                                    <Text style={{color: "white", paddingLeft: 5}}> Step {item.lastStep}</Text>
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
     backgroundColor: '#002347',
    },
    itemContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#a1a1a1",
    },
    progressOverlay: {
        position: 'absolute',
        width: windowWidth - 30,
        height: 150,
        backgroundColor: 'rgba(255, 142, 0, 0.5))',
        borderRadius: 15,
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
      color: "#FF8E00"
    },
    desc: {
        fontSize: 15,
        padding: 10,
        color: "white"
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row"
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FF8E00",
        margin: 5,
        padding: 12.5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
  });

export default TutorialListView;

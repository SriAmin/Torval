/*
TutorialDescriptionView.js

This is a View component that gives the user more information regarding the selected tutorial,
information such as the image, title, description, and difficulty. You can also start the tutorial
from here.
*/

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import {
    ViroBox,
} from '@viro-community/react-viro';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//JSON file contains the tutorial information such as teh instructions and models
const tutorial = [
    {
        "model" : require('../models/notebook.obj'),
        "instruction" : "Hello welcome to the first screen of the Tutorial, please look around, test out the AR Functionality, when your're ready tap the next button to see the next AR Scene"
    },
    {
        "model" : <ViroBox position={[0.0, 0.0, 0.0]} scale={[.1, .1, .1]}  />,
        "instruction" : "This is the 2nd set of instructions of the tutorial, this is simply a white cube but please interact if you desire to. Thank you!"
    }
]

const DifficultyElement = ({difficulty}) => {
    /*
    DifficultyElement is there to compute the logic of the difficulty field and gives a UI component
    that translate that value

    Parameters:
    difficulty is the numerical value that is from the tutorial object

    Returns:
    FlatList component
    */
    const difficultyList = []
    for (let index = 0; index < difficulty; index++) {
        difficultyList.push(true)
    }
    for (let index = difficulty; index <= 4; index++) {
        difficultyList.push(false) 
    }

    return (
        <FlatList
            data={difficultyList}
            horizontal={true}
            renderItem={({item}) => {
                if (item) {
                    return (
                        <AntDesign name="star" size={24} color="black" />
                    )
                }
                else {
                    return (
                        <AntDesign name="staro" size={24} color="black" />
                    )
                }
            }}
        />
    );
}

const TutorialDescriptionView = ({ navigation, route }) => {
    /*
    TutorialDescriptionView will provide a description of the tutorial using several UI components

    Parameters:
    navigation object that is given from react navigation to allow the use of react navigation functions
    route objects contains the parameters given while navigating

    Returns:
    FlatList component
    */
    let tutorialInfo = route.params.tutorial;
    console.log(tutorialInfo)
    
    return (
        <View style={styles.container}>
            <Image style={styles.itemImg} 
                source={{
                    uri: 'https://image.shutterstock.com/image-photo/business-woman-working-on-modern-260nw-1364492978.jpg',
            }}/>
            <View style={{backgroundColor: "black", width: windowWidth, height: 5, marginBottom: 30}}/>
            <View styles={styles.infoContainer}>
                <Text style={styles.title}>{tutorialInfo.title}</Text>
                <Text style={styles.desc}>{tutorialInfo.description}</Text>
                <DifficultyElement difficulty={tutorialInfo.difficulty}/>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Tutorial', { tutorial: tutorial })}}>
                    <Text style={{color: "white", fontSize: 18, marginRight: 10}}>Start</Text>
                    <AntDesign name="caretright" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        
    },
    itemImg: {
        width: windowWidth,
        height: 200,
        borderBottomWidth: 3
    },
    title: {
      padding: 10,
      marginBottom: 15,
      fontSize: 24,
      textAlign: "center",
      color: "#7b42f5"
    },
    desc: {
        fontSize: 16,
        padding: 10,
        color: "darkslategrey"
    },
    difficulty: {
        fontSize: 16,
        padding: 10,
        color: "darkslategrey"
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#7b42f5",
        marginTop: 50,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
  });

export default TutorialDescriptionView;

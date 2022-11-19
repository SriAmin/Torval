/*
TutorialDescriptionView.js

This is a View component that gives the user more information regarding the selected tutorial,
information such as the image, title, description, and difficulty. You can also start the tutorial
from here.
*/

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { userDocument } from '../../config/firebase';

import {
    ViroBox,
} from '@viro-community/react-viro';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DifficultyElement = ({ difficulty }) => {
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
            style={{marginLeft: 30}}
            data={difficultyList}
            horizontal={true}
            renderItem={({ item }) => {
                if (item) {
                    return (
                        <AntDesign name="star" size={24} color="white"/>
                    )
                }
                else {
                    return (
                        <AntDesign name="staro" size={24} color="white" />
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
    const index = route.params.tutorialIndex;
    let tutorialInfo = route.params.tutorial;
    console.log(tutorialInfo)

    const lastStep = userDocument.tutorialLastStep;
    let lastStepArray = [];
    if (lastStep != undefined || lastStep != null) {
        lastStepArray = [
            lastStep.buildAComputer,
            lastStep.cleanAComputer,
            lastStep.gpuInstallation,
            lastStep.waterCooling
        ];
    }
    else {
        lastStepArray = [1,1,1,1];
    }

    return (
        <View style={styles.container}>
            <Image style={styles.itemImg}
                source={{
                    uri: tutorialInfo.image,
                }} />
            <View style={{ backgroundColor: "black", width: windowWidth, height: 5, marginBottom: 30 }} />
            <View styles={styles.infoContainer}>
                <Text style={styles.title}>{tutorialInfo.title}</Text>
                <Text style={styles.desc}>{tutorialInfo.description}</Text>
                <DifficultyElement difficulty={tutorialInfo.difficulty} />
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (Platform.OS == "web") {
                        alert("Sorry, currently this function doesn't work properly on this platform.")
                    } else {
                        navigation.navigate('Tutorial', { tutorialIndex: index })
                    }
                }}>
                    <Text style={{ color: "white", fontSize: 18, marginRight: 10 }}>Start</Text>
                    <AntDesign name="caretright" size={30} color="white" />
                    <Text style={{color: "white", paddingLeft: 5}}> Step {lastStepArray[index]}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#002347',
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
        color: "#FF8E00"
    },
    desc: {
        fontSize: 16,
        padding: 10,
        color: "white"
    },
    difficulty: {
        fontSize: 16,
        padding: 10,
        color: "white"
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#FF8E00",
        marginTop: 50,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TutorialDescriptionView;

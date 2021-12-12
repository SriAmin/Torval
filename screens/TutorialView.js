/*
TutorailView.js

This is the main AR Tutorials component, using Viro, we can display an
AR environment, setting it up with the tutorial object passed into it,
we can show the first Tutorial AR Scene, and allow controls through
2D UI.
*/

import React, { useState, useRef } from 'react';
import {
    ViroARSceneNavigator,
} from '@viro-community/react-viro';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import TutorialSceneAR from '../components/TutorialSceneAR';
import TutorialSceneAR2 from '../components/TutorialSceneAR2';

const TutorialView = ({ navigation, route }) => {
    /*
    TutorialView will provide the use the AR environment, using Viro and the ViroARSceneNavigator
    we can show a user a ViroARScene. It also has 2D UI controls.

    Parameters:
    navigation object that is given from react navigation to allow the use of react navigation functions
    route objects contains the parameters given while navigating

    Return:
    View component with ViroARSceneNavigator and 2D UI components
    */
   
    const tutorial = route.params.tutorial
    const [instruction, setInstruction] = useState(tutorial[0])
    const arSceneNav = useRef(null);

    return (
        <View style={styles.arView}>
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                    scene: TutorialSceneAR,
                }}
                ref={arSceneNav}
                style={styles.f1}
            />
            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.uiView}>
                <Text style={styles.instruction}>{instruction.instruction}</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        setInstruction[tutorial[0]]
                        arSceneNav.current.arSceneNavigator.pop() 
                    }}>
                        <Entypo name="arrow-bold-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setInstruction(tutorial[1])
                        arSceneNav.current.arSceneNavigator.push({ scene: TutorialSceneAR2 })
                    }}>
                        <Entypo name="arrow-bold-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    arView: {
        flex: 1,
    },
    backButton: {
        flex: 1,
        position: 'absolute',
        top: 40,
        left: 15,
        padding: 5,
    },
    uiView: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        backgroundColor: '#000000aa'
    },
    instruction: {
        color: "white",
        padding: 10,
    },
    buttonGroup: {
        flex: 1,
        flexDirection: "row"
    },
    button: {
        flex: 1,
        backgroundColor: "#7b42f5",
        margin: 10,
        padding: 12.5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TutorialView;

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

import TutorialSceneAR from '../../components/TutorialSceneAR';
import TutorialSceneAR2 from '../../components/TutorialSceneAR2';

//JSON file contains the tutorial information such as teh instructions and models
const tutorialInstructions = [
    "Welcome, ready to build your PC, the first step is to open the CPU latch on the motherboard, and carefully place the CPU in the bracket, make sure the triangles on the corner matchs, once the CPU fits in snug, put the metal latch down to lock the CPU in place",
    "On the RAM area of the motherboard, pull the handles out, place the RAM in the slot, push down until the handles click back into place. Make sure the sticks are aligned correctly.",
    "To attach the CPU Fan, if there isn't thermal paste on the fan, place a drop of it on the CPU, place the fan on top of the CPU and screw it in with the screws given from the CPU Fan.",
    "Grab the PC case, and unscrew the sides, we want to open the sides of the PC case to place the components inside. Unscrew and remove both side panels.",
    "On the Power Supply, input the required power cables on the back, these are Motherboard, CPU, PCI/E, and SATA, make sure you put the right cables, refer to the manual if you need to.",
    "Place the Power Supply in the PSU slot on the PC, the power switch should be exposed from the back of the PC, using the screws provided from the power supply, screw the power supply to the case",
    "Remove any unwanted standoffs and place the motherboard overtop the existing ones, make sure the number of standoffs are the same as the number of holes on the motherboard that you can screw in, place the motherboard in, screw it, and attach it to the PC Case.",
    "If you have a hardrive (HDD), Turn the PC to face the other side, and slide the HDD into the slot indicated above, it should easily slide and lock into place",
    "If you have a solid state drive (SDD), place the SDD into the bracket shown above, screw it into place using the screws provided by the SDD bracket.",
    "Turn the PC back around to face the side of the motherboard, unscrew and remove the side grill prices where the graphics card will be, don't remove all of them, just the ones needed for the graphics card to poke through",
    "On the PCI/E handle, where the graphics card (GPU) will be placed, pull back the handle and place the GPU over it, push it into place until the handle snaps back and locks in the GPU, make sure the HDMI inputs poke through the end of the PC",
    "To add power to the motherboard, CPU and GPU, get the ends of the motherboard cable, CPU cable and PCI/E cable (the ones attached to the PSU) and plug them into the slots shown above, refer to the motherboard manual as well if you have trouble finding the spot to plug the power cables in",
    "Turn the PC around and plug the SATA power (from PSU) and SATA data cable (included with motherboard) into the HDD and SDD, turn the PC around and plug the other ends of the SATA data cable into the motherboard",
    "Plug in the power cables that came with the PC Case, this should allow you to use the input on your PC (Power button and USB), we highly suggest you to refer to the motherboard manual in regards to how you should plug it, as they change per model",
    "Finally, screw back in the side panels of the PC, flip the switch on the PSU, plug the PC power cable (comes with the PC), and press on the power button. Congratualtions, you've built PC with custom components, for any issues that occur please use the forum threads to help from our community."
]

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
   
    const [instruction, setInstruction] = useState(tutorialInstructions[0])
    const [tutorialStep, setTutorialStep] = useState(1);
    const arSceneNav = useRef(null);

    const nextStep = async () => {
        setTutorialStep(tutorialStep+1);
        setInstruction(tutorialInstructions[tutorialStep]);
        const tempStep = tutorialStep+1;
        arSceneNav.current.arSceneNavigator.pop()
        arSceneNav.current.arSceneNavigator.push({ 
            scene: TutorialSceneAR, 
            passProps: { modelName: "Step" + tempStep.toString() } 
        })
        console.log("Pushed out Scene");
    }

    const previousStep = async () => {
        setTutorialStep(tutorialStep-1);
        setInstruction(tutorialInstructions[tutorialStep-2]);
        const tempStep = tutorialStep-1;
        arSceneNav.current.arSceneNavigator.pop()
        arSceneNav.current.arSceneNavigator.push({ 
            scene: TutorialSceneAR, 
            passProps: { modelName: "Step" + tempStep.toString() } 
        })
        console.log("Popped out Scene");
    }

    return (
        <View style={styles.arView}>
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                    scene: TutorialSceneAR,
                    passProps: { modelName: "Step1" }
                }}
                videoQuality="Low"
                ref={arSceneNav}
                style={styles.f1}
            />
            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.uiView}>
                <Text style={styles.instruction}>{instruction}</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => { 
                        previousStep()
                    }}>
                        <Entypo name="arrow-bold-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        nextStep()
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

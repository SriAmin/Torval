/*
TutorailView.js

This is the main AR Tutorials component, using Viro, we can display an
AR environment, setting it up with the tutorial object passed into it,
we can show the Tutorial AR Scene, and allow controls through
2D UI.
*/

import React, { useState, useRef } from 'react';
import {
    ViroARSceneNavigator,
} from '@viro-community/react-viro';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { userDocument, updateTutorialStep} from '../../config/firebase';

import TutorialSceneAR from '../../components/TutorialSceneAR';
import CleanTutorialARScene from '../../components/CleanTutorialARScene';
import InstructionSubMenu, { stepMenu } from './InstructionSubMenu';

import { Tutorials } from '../../components/TutorialInstructions';

const TutorialView = ({ navigation, route }) => {
    /*
    TutorialView will provide the use the AR environment, using Viro and the ViroARSceneNavigator
    we can show a user a ViroARScene by passing a step property to show the correct 3D model. 
    It also has 2D UI controls.

    Parameters:
    navigation object that is given from react navigation to allow the use of react navigation functions
    route objects contains the parameters given while navigating

    Return:
    View component with ViroARSceneNavigator and 2D UI components
    */

    const tutorialIndex = route.params.tutorialIndex;
    let tempTutorialStep;
    let ARSceneNavgiator;
    let tutorialInstructions;

    //Refernce values to be called throughout the code
    const arSceneNav = useRef(null);

    if (tutorialIndex == 1) {
        const lastStep = (userDocument.tutorialLastStep.cleanAComputer < 1) ? 1 : userDocument.tutorialLastStep.cleanAComputer;
        tempTutorialStep = (lastStep == undefined || lastStep == null) ? 1 : lastStep;
        tutorialInstructions = Tutorials[1];
        ARSceneNavgiator = <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
                scene: CleanTutorialARScene,
                passProps: { modelName: "Step" + tempTutorialStep.toString() }
            }}
            videoQuality="Low"
            ref={arSceneNav}
            style={styles.f1}
        />
    } else {
        const lastStep = (userDocument.tutorialLastStep.buildAComputer < 1) ? 1 : userDocument.tutorialLastStep.buildAComputer;
        tempTutorialStep = (lastStep == undefined || lastStep == null) ? 1 : lastStep;
        tutorialInstructions = Tutorials[0];
        ARSceneNavgiator = <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
                scene: TutorialSceneAR,
                passProps: { modelName: "Step" + tempTutorialStep.toString() }
            }}
            videoQuality="Low"
            ref={arSceneNav}
            style={styles.f1}
        />
    }

    //State variables to keep track of the tutorials state
    const [tutorialStep, setTutorialStep] = useState(tempTutorialStep);
    // const [stepMenu, setStepMenu] = useState(false);
    const [opacityCoverActive, setOpacityCover] = useState(false);

    let opacityCover;
    //Based on the stepMenu variable, show the Step Sub Menu
    if (opacityCoverActive) {
        opacityCover = <View style={styles.opacityCover} />
    }

    const nextStep = async () => {
        /*
        nextStep function is called when the next step button is pressed on,
        it'll push a new AR scene to the ViroARSceneNavigator, it'll also
        push the step to make sure the correct model displays. the tutorialStep
        will increment by 1.
        */

        //If we are at the last step, go back to TutorialListView
        if (tutorialStep == 15 && tutorialIndex !== 1) {
            await updateTutorialStep("buildAComputer", 1);
            navigation.goBack();
        } else if (tutorialStep == 5 && tutorialIndex === 1) {
            await updateTutorialStep("cleanAComputer", 1);
            navigation.goBack();
        }
        else {
            setTutorialStep(tutorialStep + 1);
            const tempStep = tutorialStep + 1;
            changeARScene(tempStep);
        }
        console.log("Pushed out Scene");
    }

    const previousStep = async () => {
        /*
        previousStep function is called when the previous step button is pressed on,
        it'll push a new AR scene to the ViroARSceneNavigator, it'll also
        push the step to make sure the correct model displays. The tutorialStep will
        decrement by 1.
        */

        //If we are on the first step, go back to TutorialListView
        if (tutorialStep == 1) {
            navigation.goBack();
        } else {
            setTutorialStep(tutorialStep - 1);
            const tempStep = tutorialStep - 1;
            changeARScene(tempStep);
        }
        console.log("Popped out Scene");
    }

    const jumpStep = async (stepIndex) => {
        /*
        jumpStep function is called when a step is pressed on within the submenu,
        it'll push a new AR scene to the ViroARSceneNavigator, it'll also
        push the step to make sure the correct model displays. The tutorialStep will
        be equal to the selected step.
        */
        setTutorialStep(stepIndex);
        changeARScene(stepIndex);
        console.log("Jumped to Scene" + tutorialStep);
    }

    const changeARScene = (stepIndex) => {
        arSceneNav.current.arSceneNavigator.pop()
        if (tutorialIndex == 1) {
            console.log("Hello?")
            arSceneNav.current.arSceneNavigator.push({
                scene: CleanTutorialARScene,
                passProps: { modelName: "Step" + stepIndex.toString() }
            })
        } else {
            arSceneNav.current.arSceneNavigator.push({
                scene: TutorialSceneAR,
                passProps: { modelName: "Step" + stepIndex.toString() }
            })
        }
    }

    const exitTutorial = async () => {
        if (tutorialStep !== userDocument.tutorialLastStep.buildAComputer || tutorialStep !== userDocument.tutorialLastStep.cleanAComputer) {
            if (tutorialIndex == 1) {
                await updateTutorialStep("cleanAComputer", tutorialStep);
            } else {
                await updateTutorialStep("buildAComputer", tutorialStep);
            }
        }
        navigation.goBack();
    }

    return (
        <View style={styles.arView}>
            {ARSceneNavgiator}
            <TouchableOpacity style={styles.backButton} onPress={() => {
                exitTutorial();
            }}>
                <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.uiView}>
                <Text style={styles.instruction}>{tutorialInstructions[tutorialStep - 1].title}</Text>
                <Text style={styles.instruction}>{tutorialInstructions[tutorialStep - 1].step}</Text>
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
            {opacityCover}
            <InstructionSubMenu tutorial={tutorialInstructions} opacityCoverFunction={setOpacityCover} jumpStepFunction={jumpStep} />
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
    stepButton: {
        flex: 1,
        position: 'absolute',
        top: 40,
        padding: 5,
        flexDirection: "row",
        height: '100%',
    },
    opacityCover: {
        backgroundColor: 'rgba(0, 35, 71, 0.8)',
        position: "absolute",
        width: '100%',
        height: '100%',
        flex: 1,
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
        backgroundColor: "#FF8E00",
        margin: 10,
        padding: 12.5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TutorialView;

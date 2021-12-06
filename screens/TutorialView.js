import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import ARFrameworkController from '../controllers/ARFrameworkController';
import { Ionicons, Entypo } from '@expo/vector-icons';

import TutorialSceneAR from '../controllers/TutorialSceneAR';
import TutorialSceneAR2 from '../controllers/TutorialSceneAR2';


const TutorialView = ({ navigation, route }) => {
    const [curScene, setCurScene] = useState(1)
    return (
        <ARFrameworkController goBack={() => {navigation.goBack()}}/>
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
        height: 110,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        backgroundColor: '#000000aa'
    },
    instruction: {
        color: "white"
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

export default TutorialView;

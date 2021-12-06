import React, { useRef } from 'react';
import {
  ViroARScene,
  Viro3DObject,
  ViroBox,
  ViroAmbientLight,
  ViroConstants,
  ViroARPlane,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import TutorialSceneAR from './TutorialSceneAR';
import TutorialSceneAR2 from './TutorialSceneAR2';

const ARFrameworkController = (props) => {
  console.log(props.scene)
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
      <TouchableOpacity style={styles.backButton} onPress={props.goBack}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
      </TouchableOpacity>
      <View style={styles.uiView}>
        <Text style={styles.instruction}>Hello welcome to the first screen of the Tutorial, please look around, test out the AR Functionality, when your're ready tap the next button to see the next AR Scene</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => {arSceneNav.current.arSceneNavigator.pop()}}>
            <Entypo name="arrow-bold-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {arSceneNav.current.arSceneNavigator.push({scene:  TutorialSceneAR2})}}>
            <Entypo name="arrow-bold-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
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

export default ARFrameworkController;
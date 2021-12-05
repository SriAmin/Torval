import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
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

const TutorialSceneAR = (props) => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log("AR is Ready")
      setText('Hello, its good to meet you!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  function goToNextScene (){
    props.sceneNavigator.push({scene:TutorialSceneAR2});
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
        <Viro3DObject 
            source={require('../models/notebook.obj')}
            resources={[require('../models/Lowpoly_Notebook_2.mtl'),
              require('../models/textures/Lowpoly_Laptop_1.jpg'),
              require('../models/textures/Lowpoly_Laptop_2.jpg'),
              require('../models/textures/Lowpoly_Laptop_Nor_1.jpg'),
              require('../models/textures/Lowpoly_Laptop_Nor_2.jpg'),]}
            position={[0.0, 0.0, 0.0]}
            scale={[0.1, 0.1, 0.1]}
            type="OBJ"
            onClick={() => {goToNextScene()}}
          />
        <ViroAmbientLight color="#FFFFFF" />   
    </ViroARScene>
  );
};

const TutorialSceneAR2 = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log("AR is Ready")
      setText('Hello, its good to meet you!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
        <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]}  />
    </ViroARScene>
  );
};

const ARFrameworkController = () => {
  return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: TutorialSceneAR,
        }}
        style={styles.f1}
      />
  );
};

var styles = StyleSheet.create({
  arView: {
    flex: 1,
  },
  f1: {
    flex: 1,
  },
  uiView : {
    flex:1,
    height : 72,
    width : '100%',
    position : 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom : 0,
    backgroundColor: '#000000aa'
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ARFrameworkController;
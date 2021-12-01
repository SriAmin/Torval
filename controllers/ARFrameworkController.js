import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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

const TutorialSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log("AR is Ready")
      setText('Hello, its good to meet you!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  // Outside of the render function, register the target

  ViroARTrackingTargets.createTargets({
    "targetOne" : {
      source : require('../models/teslaLogo.png'),
      orientation : "Up",
      physicalWidth : 0.1 // real world width in meters
    },
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"}>
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
          />
        <ViroAmbientLight color="#FFFFFF" />      
      </ViroARPlane>
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
  f1: {flex: 2},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ARFrameworkController;
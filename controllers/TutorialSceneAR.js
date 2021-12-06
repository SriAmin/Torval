import React from 'react'
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
    function onInitialized(state, reason) {
      if (state === ViroConstants.TRACKING_NORMAL) {
        console.log("AR is Ready")
      } else if (state === ViroConstants.TRACKING_NONE) {
        // Handle loss of tracking
      }
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
          position={[0.0, 0.0, -1.0]}
          scale={[0.1, 0.1, 0.1]}
          type="OBJ"
        />
          <ViroAmbientLight color="#FFFFFF" />   
      </ViroARScene>
    );
  };

export default TutorialSceneAR;
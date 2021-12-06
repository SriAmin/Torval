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

const TutorialSceneAR2 = () => {

    function onInitialized(state, reason) {
      if (state === ViroConstants.TRACKING_NORMAL) {
        console.log("AR is Ready")
      } else if (state === ViroConstants.TRACKING_NONE) {
        // Handle loss of tracking
      }
    }
  
    return (
      <ViroARScene onTrackingUpdated={onInitialized}>
          <ViroBox position={[0, .25, -1.0]} scale={[.5, .5, .5]}  />
      </ViroARScene>
    );
  };

  export default TutorialSceneAR2;
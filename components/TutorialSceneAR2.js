import React from 'react'
import {
    ViroARScene,
    ViroBox,
    ViroConstants,
    ViroARPlane,
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
        <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"}>
          <ViroBox position={[0.0, 0.0, 0.0]} scale={[.1, .1, .1]}  />
        </ViroARPlane>
      </ViroARScene>
    );
  };

  export default TutorialSceneAR2;
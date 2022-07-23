/*
TutorialSceneAR.js

This is the first AR scene that the user will see upon loading up
the tutorial, with a custom 3D model of a Laptop with gesture controls,
it'll only appear once a plane is scanned and set.
*/

import React, { useState, useRef } from 'react'
import {
  ViroARScene,
  Viro3DObject,
  ViroNode,
  ViroAmbientLight,
  ViroConstants,
  ViroARPlane,
} from '@viro-community/react-viro';

const TutorialSceneAR = () => {
  /*
  TutorialSceneAR() is the main component that is the AR Scene given
  to the ARSceneNavgiator, its the first. It'll show a custom 3D model
  of a laptop and allows gesture control

  Returns
  ViroAR Scene that contains the Viro3DObject, ViroNode and ViroARPlane
  */

  //State variables required to maintain the scale and angle of 3D object
  const [scale, setScale] = useState(0.1);
  const [angle, setAngle] = useState([0.0, 0.0, 0.0]);

  //Reference variable to be able to use the functions of ViroNode
  const arNodeRef = useRef(null);

  function onInitialized(state, reason) {
    /*
    onIntialized function is called when the ViroARScene is intialized and set

    Parameters:
    state: Contains the state of the ViroARScene
    */

    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log("AR is Ready")
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  const _onPinch = (pinchState, scaleFactor, source) => {
    /*
    _onPinch function is called when user pinches theirs finger on the 3D Object,
    it recalculates the new scale of the 3d object and set the scale of the object

    Parameters:
    pinchState: Passed to determine the state on how the user is pinching
    scaleFactor: Numerical value that is passed based on how much the user pinched their finger
    */

    var newScale = scale * scaleFactor
    if (newScale <= 1 && newScale >= 0.05) {
      if (pinchState == 3 && newScale <= 1) {
        setScale(newScale);
        return;
      }
  
      arNodeRef.current.setNativeProps({ scale: [newScale, newScale, newScale] });

    }
  }

  const _onRotate = (rotateState, rotationFactor, source) => {
    /*
    _onRotate function is called when user rotates theirs finger on the 3D Object,
    it recalculates the new rotation of the 3d object and set the rotation of the object

    Parameters:
    rotateState: Passed to determine the state on how the user is rotating
    rotationFactor: Numerical value that is passed based on how much the user rotated their fingers
    */

    var currentAngle = angle;
    if (rotateState == 3) {
      setAngle([currentAngle[0], currentAngle[1] + rotationFactor, currentAngle[2]]);
      return;
    }

    arNodeRef.current.setNativeProps({ rotation: [currentAngle[0], currentAngle[1] + rotationFactor, currentAngle[2]] });
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"}>
        <ViroNode
          ref={arNodeRef}
          scale={[scale, scale, scale]}
          rotation={angle}
          position={[0.0, 0.0, 0.0]}
        >
          <Viro3DObject
            source={require('../models/Case.obj')}
            resources={[require('../models/Case.mtl'),
            require('../models/textures1/GPUSlot.jpg')]}
            onPinch={_onPinch}
            onRotate={_onRotate}
            type="OBJ"
          />
        </ViroNode>
        <ViroAmbientLight color="#FFFFFF" />
      </ViroARPlane>
    </ViroARScene>
  );
};

export default TutorialSceneAR;
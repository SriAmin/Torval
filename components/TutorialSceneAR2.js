/*
TutorialSceneAR2.js

This is the second AR scene that the user will see when navigating
and going to the next AR Scene, with a white cube with gesture controls,
it'll only appear once a plane is scanned and set.
*/

import React, {useState, useRef} from 'react'
import {
  ViroARScene,
  ViroBox,
  ViroConstants,
  ViroARPlane,
  ViroNode,
} from '@viro-community/react-viro';

const TutorialSceneAR2 = () => { /*
  TutorialSceneAR2() is the main component that is the AR Scene given
  to the ARSceneNavgiator, this shows up when the user navigates to the
  next AR scene, it'll show a white cube that gives gesture control

  Returns
  ViroAR Scene that contains the ViroBox, ViroNode and ViroARPlane
  */

  //State variables required to maintain the scale and angle of 3D object
  const [scale, setScale] = useState(0.1);
  const [angle, setAngle] = useState([0.0, 0.0, 0.0]);

  //Reference variable to be able to use the functions of ViroNode
  const arNodeRef = useRef(null);

  console.log("Hello");

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
    if (newScale <= 0.5 && newScale >= 0.05) {
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
          <ViroBox
            scale={[scale, scale, scale]}
            position={[0.0, 0.0, 0.0]}
            rotation={angle}
            onPinch={_onPinch}
            onRotate={_onRotate} 
            ref={arNodeRef}
            />
      </ViroARPlane>
    </ViroARScene>
  );
};

export default TutorialSceneAR2;
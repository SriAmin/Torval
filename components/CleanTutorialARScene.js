/*
CleanTutorialAR.js

This is the AR scene that the user will see upon loading up
the tutorial, with a custom 3D model with gesture controls,
this tutorial scene is aimed to show the 2nd tutorial
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

const CleanTutorialARScene = (props) => {
  /*
  CleanTutorialARScene() is the main component that is the AR Scene given
  to the ARSceneNavgiator. It'll show a custom 3D model
  of the respective tutorial step and allows gesture control.
  It'll show the 2nd tutorial and its models.

  Parameters:
  props contains a JSON object which contains any properties passed
  into the object, in our case its the tutorial step to determine
  which 3D model to display

  Returns
  ViroAR Scene that contains the Viro3DObjxect, ViroNode and ViroARPlane
  */

  //State variables required to maintain the scale and angle of 3D object
  const [scale, setScale] = useState(0.3);
  const [angle, setAngle] = useState([0.0, 0.0, 0.0]);

  //This is that tutorial step property that is passed into this object
  const modelUri = props.modelName;
  let viroObject;

  console.log("Model Uri = " + modelUri);
  
  //Based on the modelUri, set the Viro3DObject to show the correct model
  switch (modelUri) {
    case "Step1":
      viroObject = <Viro3DObject source={require('../models/CleanComputer/Step1.vrx')} onPinch={_onPinch} onRotate={_onRotate} type="VRX" animation={{name:'Scene', run:true, loop: true, delay: 1000}}/>
      break;
    case "Step2":
      viroObject = <Viro3DObject source={require('../models/CleanComputer/Step2.vrx')} onPinch={_onPinch} onRotate={_onRotate} type="VRX" animation={{name:'Scene', run:true, loop: true, delay: 1000}}/>
      break;
    case "Step3":
      viroObject = <Viro3DObject source={require('../models/CleanComputer/Step3.vrx')} onPinch={_onPinch} onRotate={_onRotate} type="VRX" animation={{name:'Scene', run:true, loop: true, delay: 1000}}/>
      break;
    case "Step4":
      viroObject = <Viro3DObject source={require('../models/CleanComputer/Step4.vrx')} onPinch={_onPinch} onRotate={_onRotate} type="VRX" animation={{name:'Scene', run:true, loop: true, delay: 1000}}/>
      break;
    case "Step5":
      viroObject = <Viro3DObject source={require('../models/CleanComputer/Step5.vrx')} onPinch={_onPinch} onRotate={_onRotate} type="VRX" animation={{name:'Scene', run:true, loop: true, delay: 1000}}/>
      break;
    default:
      viroObject = <Viro3DObject source={require('../models/CleanComputer/Step1.vrx')} onPinch={_onPinch} onRotate={_onRotate} type="VRX" animation={{name:'Scene', run:true, loop: true, delay: 1000}}/>
      break;
  }

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
          position={[0.0, -10.0, -20.0]}
        >
          {viroObject}
        </ViroNode>
        <ViroAmbientLight color="#FFFFFF" />
      </ViroARPlane>
    </ViroARScene>
  );
};

export default CleanTutorialARScene;
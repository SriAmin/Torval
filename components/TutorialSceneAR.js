import React, {useState, useRef} from 'react'
import {
  ViroARScene,
  Viro3DObject,
  ViroNode,
  ViroAmbientLight,
  ViroConstants,
  ViroARPlane,
} from '@viro-community/react-viro';

const TutorialSceneAR = (props) => {
  const [scale, setScale] = useState(0.1);
  const [angle, setAngle] = useState([0.0, 0.0, 0.0]);
  const arNodeRef = useRef(null);

  function onInitialized(state, reason) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      console.log("AR is Ready")
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  const _onPinch = (pinchState, scaleFactor, source) => {
    var newScale = scale * scaleFactor
    if (pinchState == 3) {
      setScale(newScale);
      return;
    }

    arNodeRef.current.setNativeProps({scale:[newScale, newScale, newScale]});
  }

  const _onRotate = (rotateState, rotationFactor, source) => {
    var currentAngle = angle;
    if (rotateState == 3) {
      setAngle([currentAngle[0], currentAngle[1] + rotationFactor, currentAngle[2]]);
      return;
    }

    arNodeRef.current.setNativeProps({rotation:[currentAngle[0], currentAngle[1] + rotationFactor, currentAngle[2]]});
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
            source={require('../models/notebook.obj')}
            resources={[require('../models/Lowpoly_Notebook_2.mtl'),
            require('../models/textures/Lowpoly_Laptop_1.jpg'),
            require('../models/textures/Lowpoly_Laptop_2.jpg'),
            require('../models/textures/Lowpoly_Laptop_Nor_1.jpg'),
            require('../models/textures/Lowpoly_Laptop_Nor_2.jpg'),]}
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
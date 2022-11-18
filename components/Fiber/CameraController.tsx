import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree } from "@react-three/fiber";
import React from "react";

const CameraController = () => {
    const { camera, gl } = useThree();
    React.useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 100;
        controls.maxDistance = 1000;
        controls.reset();
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };
  export default CameraController;
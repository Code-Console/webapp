import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useThree } from "@react-three/fiber";
import React from "react";

const CameraController = ({ enableZoom = true }: { enableZoom?: boolean }) => {
  const { camera, gl } = useThree();
  React.useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 1000;
    controls.enableZoom = enableZoom;
    controls.reset();
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
export default CameraController;

import React from "react";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { useFrame } from "@react-three/fiber";
import { dealWithKeyboard } from "../../../util/Keyboard";

const TextAnim = (props: any) => {
  const ref: any = React.useRef();

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: "#ff0000" })
  );

  useFrame((state) => {
    state.clock.getElapsedTime();
  });
  React.useEffect(() => {
    document.addEventListener("keydown", dealWithKeyboard);
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <CameraController />
      <primitive object={mesh} dispose={null} />
    </group>
  );
};

export default TextAnim;

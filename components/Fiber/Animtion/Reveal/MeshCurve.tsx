import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import CameraController from "../../CameraController";
import { setPositionValue } from "./actions";
const MeshCurve = () => {
  const mesh = new THREE.Points(
    new THREE.TorusKnotGeometry(128, 48, 256, 256),
    new THREE.MeshPhongMaterial({color:'#ffffff'})
  );
  setPositionValue({
    trigger: ".RevealUI",
    start: "top top",
    end: `+=${document.body.scrollHeight}`,
    movePos: new THREE.Vector3(0, 400, -500),
    position: mesh.position,
  });
  
  mesh.position.set(0, -200, -500);
  useFrame((state) => {
    const t = state.clock.getElapsedTime()*.1;
    mesh.rotation.set(0, Math.sin(t), t);
  });
  return (
    <>
      <CameraController />
      <primitive object={mesh} dispose={null} />
    </>
  );
};

export default MeshCurve;
//
